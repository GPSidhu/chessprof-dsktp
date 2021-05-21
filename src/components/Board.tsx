import React, { ReactElement, useEffect, useState, RefObject } from 'react'
import styled from 'styled-components'
import { VIEW, FILES } from '../constants'
import { Move, PieceType } from "chess.js"
import Piece from './Piece';
import chessboard1 from '../assets/chessboard/chessboard-1.png';
import chessboard2 from '../assets/chessboard/chessboard-2.png';

//redux imports
import { useSelector, useDispatch } from 'react-redux'
import { BoardState } from '../redux/reducer'
import { onPieceClick } from '../redux/actions'

// const Chess = require('chess.js')
const DEFAULT_BOARD_SIZE = 720; //in px

interface Square {
    x: number       // left in px
    y: number       // top in px
    row?: number     // 0 to 7 in board[][]
    col?: number     // 0 to 7 in board[][]
    name?: string    // "e4", "g2", ...
    file?: string    // "a", "b", "c", "d", "e", "f", "g", "h"
    rank?: number    // 1 to 8
}
interface SquareIndicatorProps {
    x: number
    y: number
    size: number
}
const BoardContainer = styled.div`
    position: relative;
    width: 720px;
    height: 720px;
    margin: 1rem:
`
const BoardImage = styled.img`
    z-index: -1;
`
const SquareIndicator = styled.div`
    position: absolute;
    width: ${(props: SquareIndicatorProps) => (props.size+2)+'px'};
    height: ${(props: SquareIndicatorProps) => (props.size+2)+'px'};
    left: ${(props: SquareIndicatorProps) => props.x+'px'};
    top: ${(props: SquareIndicatorProps) => props.y+'px'};
    // marginTop: -4px;
    background: #f0eb97;
    z-index: 1;
`

const defaultProps = {
    fen: 'nbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    view: VIEW.WHITE,
    pgn: '',
    readOnly: false
}

type BoardProps = {
    parent?: RefObject<HTMLDivElement> | undefined | null
    fen?: string | null | ''
    pgn?: string | null | ''
    view?: VIEW
    readonly?: boolean
} & typeof defaultProps;

const Board = ({
    fen,
    pgn,
    view,
    parent,
    readOnly
}: BoardProps): ReactElement => {
    const dispatch = useDispatch();
    const [boardSize, setBoardSize] = useState<number>(DEFAULT_BOARD_SIZE);
    // const selectedPiece = useSelector<BoardState, BoardState["selectedPiece"]>((state) => state.selectedPiece)
    const state = useSelector<BoardState, BoardState>((state) => state);
    const { board, selectedPiece } = state;

    const onPieceClicked = (piecePos: string) => {
        dispatch(onPieceClick(piecePos))
    }

    const getSquarePosition = (rank: number, file: number, view: VIEW) => {
        if (view === VIEW.WHITE) {
            return {
                pos: `${FILES[file]}${8 - rank}`,
                col: file,
                row: rank
            }
        }
        return {
            pos: `${FILES[file]}${8 - rank}`,
            col: 8 - file - 1,
            row: 8 - rank - 1
        }
    }

    useEffect(() => {
        if (parent?.current) {
            let rect = parent?.current.getBoundingClientRect();
            let parentSize = Math.min(rect.width, rect.height);
            setBoardSize(parentSize > DEFAULT_BOARD_SIZE ? DEFAULT_BOARD_SIZE : parentSize - 60);
        }
        // try {
        //     if (fen) {
        //         chess.load(fen)
        //     } else if (pgn) {
        //         chess.load_pgn(pgn);
        //     }
        //     console.log("New board initialized")
        // } catch (e) {
        //     console.error("Error loading fen|pgn: " + e.toString())
        // }

    }, [parent, fen, pgn]);

    const renderPieces = (board: ({
        type: PieceType;
        color: "b" | "w";
    } | null)[][]) => {
        let pieces: ReactElement[] = []
        board && board.forEach((rank, row) => {
            rank.forEach((square, col) => {
                if (square) {
                    const pos = getSquarePosition(row, col, view);
                    pieces.push(<Piece
                        key={pos.pos}
                        pos={pos.pos}
                        color={square.color}
                        x={pos.col * boardSize / 8}
                        y={pos.row * boardSize / 8}
                        size={boardSize / 8}
                        type={square.type}
                        interaction={readOnly}
                        selected={pos.pos === selectedPiece}
                        pieceClicked={onPieceClicked}
                    />)
                }
            })
        })
        return pieces
    }

    // converts a sqaure position "e4" to an object of type <Square>
    const translatePosToSquare = (piecePos: string) => {
        if (!piecePos) return null
        let sq: Square = {x: 0, y: 0};
        if (view === VIEW.WHITE) {
            const file = piecePos.split('')[0];
            const rank = parseInt(piecePos.split('')[1]);
            const col = FILES.findIndex((f) => f === file);
            const row = 8 - rank;
            sq = {
                file: file,
                rank: rank,
                row: row,
                col: col,
                x: col * boardSize/8,
                y: row * boardSize/8,
                name: piecePos
            };
        }
        return sq;
    }

    const renderLegalMoves = (state: BoardState): ReactElement[] | any[] | null=> {
        const { legalMoves, selectedPiece } = state;
        let squares:ReactElement[] | any[] = [];
        debugger
        if (selectedPiece && legalMoves && legalMoves.length > 0) {
            legalMoves.forEach((move: Move, index) => {
                const moveSq = translatePosToSquare(move.to);
                if (moveSq)
                    squares.push(<SquareIndicator className="indicator" key={index} x={moveSq.x} y={moveSq.y} size={boardSize/8}/>)
            })

            return squares
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
            {renderLegalMoves(state)}
        </BoardContainer>
    )
}

Board.defaultProps = defaultProps;

export default Board
