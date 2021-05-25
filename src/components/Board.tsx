import React, { ReactElement, useEffect } from 'react'
import styled from 'styled-components'
import { VIEW } from '../constants'
import { Move, PieceType, Square } from "chess.js"
import Piece from './Piece';
import chessboard1 from '../assets/chessboard/chessboard-1.png'
import chessboard2 from '../assets/chessboard/chessboard-2.png'
import SquareIndicator from './SquareIndicator'
import { convertRowColToSquare, convertPosToSquare, isNewMove } from '../utils'

//redux imports
import { useSelector, useDispatch } from 'react-redux'
import { AppState, BoardState } from './types'
import { onPieceMove, onPieceClick, loadFen, loadPGN } from '../redux/actions'

// const promotionStr = "4k2r/1P1p1ppp/5n2/2b3B1/3P4/5P2/P2NP3/3K3R w Kk - 0 1";
// const castling = "4k2r/1P1p1ppp/5n2/2b3B1/3P4/5P2/P2NP3/R2K3R w KQk - 0 1"
// const enPassant = "rnbqkbnr/ppp1pppp/8/8/4P3/2Np1NP1/PPPP1P1P/R1BQKB1R w KQkq - 0 1"
// const pinnedMove = "4k2r/1P1p1ppp/5n2/6B1/b2P4/1N3P2/P3P3/R2K3R w KQk - 0 1"

const fenStr = ''; //pinnedMove
const BoardWrapper = styled.div`
    display: table-cell;
    position: relative;
    width: 100%;
    height: auto;
    margin: 1rem:
`
const BoardImage = styled.img`
    width: 100%;    
    z-index: -1;
`
const defaultProps = {
    showSquareNumber: false,
    showLegalMoves: true
}

type BoardProps = {
    fen?: string | null | ''
    pgn?: string | null | ''
    // view: VIEW
    readOnly?: boolean
    showSquareNumber?: boolean
    showLegalMoves?: boolean
} & typeof defaultProps;

const Board = ({
    fen,
    pgn,
    readOnly,
    showSquareNumber,
    showLegalMoves
}: BoardProps): ReactElement => {
    const dispatch = useDispatch();
    const state = useSelector<AppState, BoardState>(state => state.boardState);
    const { view, board, selectedPiece } = state;
    const onPieceClicked = (piecePos: string) => {
        dispatch(onPieceClick(piecePos))
    }

    useEffect(() => {
        try {
            if (fen) {
                dispatch(loadFen(fen))
            }
            else if (pgn) {
                dispatch(loadPGN(pgn))
            }
        } catch (e) {
            console.error("Error loading fen|pgn: " + e.toString())
        }

    }, [fen, pgn, dispatch]);

    const canMove = (to: Square, from: Square) => {
        if (to && isNewMove(state)) {
            // same square
            if (to === from) return false;
            const validMoves = state.chess.moves({ square: from, verbose: true });
            return validMoves.some((move) => to === move.to)
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
                        x={pos.col * 100 / 8}
                        y={pos.row * 100 / 8}
                        type={square.type}
                        readOnly={readOnly}
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
            const selectePieceSq = convertPosToSquare(selectedPiece, view)
            if (selectePieceSq)
                squares.push(
                    <SquareIndicator
                        className="indicator"
                        key={0}
                        x={selectePieceSq.col}
                        y={selectePieceSq.row}
                        type="piece"
                    />
                )

            legalMoves.forEach((move: Move, index) => {
                const moveSq = convertPosToSquare(move.to, view);
                if (moveSq)
                    squares.push(
                        <SquareIndicator
                            key={index + 1}
                            x={moveSq.col}
                            y={moveSq.row}
                            type="move"
                            clickable={true}
                            onClick={() => {
                                dispatch(onPieceMove({
                                    from: move.from,
                                    to: move.to,
                                    type: move.piece,
                                    color: move.color
                                }))
                            }}
                        />)
            })

            return squares
        }
        return null
    }

    const highlightLastMovePlayed = (state: BoardState): ReactElement[] | any[] | null => {
        const { lastMove } = state;
        if (lastMove && lastMove.from && lastMove.to) {
            const from = convertPosToSquare(lastMove.from, view);
            const to = convertPosToSquare(lastMove.to, view);
            return [
                <SquareIndicator
                    className="indicator"
                    key={0}
                    x={from ? from.col : 0}
                    y={from ? from.row : 0}
                    color={'#c9a747'}
                    type="move"
                />,
                <SquareIndicator
                    className="indicator"
                    key={1}
                    x={to ? to.col : 0}
                    y={to ? to.row : 0}
                    type="move"
                    color={'#f7d881'}
                />
            ]
        }
        return null
    }

    return (
        <BoardWrapper>
            <BoardImage
                alt="Chessboard"
                src={view === VIEW.WHITE ? chessboard1 : chessboard2}
            // style={{ width: boardSize + '%'}}
            />
            {renderPieces(board)}
            {!readOnly && showLegalMoves && highlightLegalMoves(state)}
            {highlightLastMovePlayed(state)}
        </BoardWrapper>
    )
}

Board.defaultProps = defaultProps;

export default Board
