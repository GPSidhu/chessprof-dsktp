import React, { ReactElement, useEffect, useState, RefObject } from 'react'
import styled from 'styled-components'
import { VIEW } from '../constants'
import { Move, PieceType, Square } from "chess.js"
import Piece from './Piece';
import chessboard1 from '../assets/chessboard/chessboard-1.png'
import chessboard2 from '../assets/chessboard/chessboard-2.png'
import SquareIndicator from './SquareIndicator'
import { convertRowColToSquare, convertPosToSquare } from '../utils'

//redux imports
import { useSelector, useDispatch } from 'react-redux'
import { BoardState } from './types'
import { onPieceClick, loadFen, loadPGN, updateBoardSize } from '../redux/actions'

// const promotionStr = "4k2r/1P1p1ppp/5n2/2b3B1/3P4/5P2/P2NP3/3K3R w Kk - 0 1";
// const castling = "4k2r/1P1p1ppp/5n2/2b3B1/3P4/5P2/P2NP3/R2K3R w KQk - 0 1"
// const enPassant = "rnbqkbnr/ppp1pppp/8/8/4P3/2Np1NP1/PPPP1P1P/R1BQKB1R w KQkq - 0 1"
// const pinnedMove = "4k2r/1P1p1ppp/5n2/6B1/b2P4/1N3P2/P3P3/R2K3R w KQk - 0 1"

const fenStr = ''; //pinnedMove

const DEFAULT_BOARD_SIZE = 720; //in px

const BoardContainer = styled.div`
    position: relative;
    width: 720px;
    height: 720px;
    margin: 1rem:
`
const BoardImage = styled.img`
    z-index: -1;
`
const defaultProps = {
    fen: fenStr, //'r1bqkbnr/pppppppp/2n1pn2/8/4P3/3P1N2/PPP2PPP/RNBQKBNR w KQkq - 0 1', // -> not needed as new Chess() will initialize board with this fen
    view: VIEW.WHITE,
    pgn: '',
    readOnly: false,
    showSquareNumber: false,
    showLegalMoves: false
}

type BoardProps = {
    parent?: RefObject<HTMLDivElement> | undefined | null
    fen?: string | null | ''
    pgn?: string | null | ''
    view?: VIEW
    readonly?: boolean
    showSquareNumber?: boolean
    showLegalMoves?: boolean
} & typeof defaultProps;

const Board = ({
    fen,
    pgn,
    view,
    parent,
    readOnly,
    showSquareNumber,
    showLegalMoves
}: BoardProps): ReactElement => {
    const dispatch = useDispatch();
    const [boardSize, setBoardSize] = useState<number>(DEFAULT_BOARD_SIZE);
    const state = useSelector<BoardState, BoardState>((state) => state);
    const { board, selectedPiece } = state;

    const onPieceClicked = (piecePos: string) => {
        dispatch(onPieceClick(piecePos))
    }

    useEffect(() => {
        if (parent?.current) {
            let rect = parent?.current.getBoundingClientRect();
            let parentSize = Math.min(rect.width, rect.height);
            const bSize = parentSize > DEFAULT_BOARD_SIZE ? DEFAULT_BOARD_SIZE : parentSize - 60;
            setBoardSize(bSize);
            dispatch(updateBoardSize(bSize))
        }
        try {
            if (fen) {
                dispatch(loadFen(fen))
            }
            else if (pgn) {
                dispatch(loadPGN(pgn))
            }
            console.log("New board initialized")
        } catch (e) {
            console.error("Error loading fen|pgn: " + e.toString())
        }

    }, [parent, fen, pgn, dispatch]);

    const canMove = (to: Square, from: Square) => {
        if (to) {
            // same square
            if (to === from) return false;
            const validMoves = state.chess.moves({ square: from, verbose: true });
            const flag = validMoves.some((move) => to === move.to)
            if (flag) {
                return true
            }
        }
        return false
    }

    const renderPieces = (board: ({
        type: PieceType;
        color: "b" | "w";
    } | null)[][]) => {
        let pieces: ReactElement[] = []
        board && board.forEach((rank, row) => {
            rank.forEach((square, col) => {
                if (square) {
                    const pos = convertRowColToSquare(row, col, view);
                    pieces.push(<Piece
                        key={pos.pos}
                        pos={pos.pos}
                        color={square.color}
                        view={view}
                        x={pos.col * boardSize / 8}
                        y={pos.row * boardSize / 8}
                        size={boardSize / 8}
                        type={square.type}
                        interaction={readOnly}
                        selected={pos.pos === selectedPiece}
                        showSquareNumber={showSquareNumber}
                        pieceClicked={onPieceClicked}
                        canMove={canMove}
                    />)
                }
            })
        })
        return pieces
    }

    const highlightLegalMoves = (state: BoardState): ReactElement[] | any[] | null => {
        const { legalMoves, selectedPiece } = state;
        let squares: ReactElement[] | any[] = [];
        if (selectedPiece && legalMoves && legalMoves.length > 0) {
            const selectePieceSq = convertPosToSquare(selectedPiece, view, boardSize)
            if (selectePieceSq)
                squares.push(
                    <SquareIndicator
                        key={0}
                        x={selectePieceSq.x}
                        y={selectePieceSq.y}
                        size={boardSize / 8}
                        type="piece"
                    />
                )

            legalMoves.forEach((move: Move, index) => {
                const moveSq = convertPosToSquare(move.to, view, boardSize);
                if (moveSq)
                    squares.push(
                        <SquareIndicator
                            key={index + 1}
                            x={moveSq.x}
                            y={moveSq.y}
                            size={boardSize / 8}
                            type="move"
                        />)
            })

            return squares
        }
        return null
    }

    const highlightLastMovePlayed = (state: BoardState): ReactElement[] | any[] | null => {
        const { lastMove } = state;
        if (lastMove) {
            const from = convertPosToSquare(lastMove.from, view, boardSize);
            const to = convertPosToSquare(lastMove.to, view, boardSize);
            return  [
                <SquareIndicator
                    key={0}
                    x={from ? from.x : 0}
                    y={from ? from.y : 0}
                    size={boardSize / 8}
                    color={'#c9a747'}
                    type="move"
                    />,
                <SquareIndicator
                    key={1}
                    x={to ? to.x : 0}
                    y={to ? to.y : 0}
                    size={boardSize / 8}
                    type="move"
                    color={'#f7d881'}
                    />
            ]
        }

        return null
    }
    return (
        <BoardContainer style={{ width: boardSize + 'px', height: boardSize + 'px' }}>
            <BoardImage
                alt="Chessboard"
                src={view === VIEW.WHITE ? chessboard1 : chessboard2}
                style={{ width: boardSize + 'px', height: boardSize + 'px' }}
            />
            {renderPieces(board)}
            {showLegalMoves && highlightLegalMoves(state)}
            {highlightLastMovePlayed(state)}
        </BoardContainer>
    )
}

Board.defaultProps = defaultProps;

export default Board
