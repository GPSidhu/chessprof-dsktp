import React, { ReactElement, useEffect } from 'react'
import styled from 'styled-components'

//react redux imports
import { useSelector, useDispatch } from 'react-redux'
import {
    onPieceMove,
    onPieceClick,
    loadFen,
    loadPGN,
    setMoveOptionSelected
} from '../../redux/actions'

// third party
import { Move, PieceType, Square } from "chess.js"

// src
import { VIEW } from '../../constants'
import Piece from './Piece';
import chessboard1 from '../../assets/chessboard/chessboard-1.png'
import chessboard2 from '../../assets/chessboard/chessboard-2.png'
import SquareIndicator from './SquareIndicator'
import { convertRowColToSquare, convertPosToSquare, isNewMove } from '../../utils'
import { AppState, BoardState, PanelOverrides } from '../types'

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
    readOnly?: boolean
    showSquareNumber?: boolean
    showLegalMoves?: boolean
    config?: PanelOverrides
} & typeof defaultProps;

const Board = ({
    fen,
    pgn,
    readOnly,
    showSquareNumber,
    showLegalMoves,
    config
}: BoardProps): ReactElement => {
    const dispatch = useDispatch();
    const state = useSelector<AppState, BoardState>(state => state.boardState);
    const { view, board, selectedPiece } = state;

    useEffect(() => {
        try {
            if (fen) {
                dispatch(loadFen(fen))
            }
            else if (pgn) {
                dispatch(loadPGN(pgn))
                // to do: create history[] in loadPGN reducer
            }
        } catch (e) {
            console.error("Error loading fen|pgn: " + e.toString())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fen, pgn]);

    const canMove = (to: Square, from: Square) => {
        if (to && isNewMove(state)) {
            // same square
            if (to === from) return false;
            const validMoves = state.chess.moves({ square: from, verbose: true });
            return validMoves.some((move) => to === move.to)
        }
        return false
    }

    const onPieceClicked = (piecePos: string) => {
        dispatch(onPieceClick(piecePos))
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
        let squares: ReactElement[] = [];
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

    const showMoveOptions = (state: BoardState): ReactElement[] | [] => {
        const { moveOptions } = state;
        let squares: ReactElement[] = [];
        let fromMap = new Map();    // for selecting unique source squares
        let toMap = new Map();      // for selecting unique target squares
        if (moveOptions) {
            moveOptions.forEach((option, index) => {
                if (!fromMap.get(option.from)) {
                    fromMap.set(option.from, 1);
                    const fromSqPos = convertPosToSquare(option.from, view);
                    if (fromSqPos) {
                        squares.push(
                            <SquareIndicator key={`${index + 1}_${option.from}`} x={fromSqPos.col} y={fromSqPos.row}
                                type="selection" clickable={true} color={"#6e87f5"}
                                style={{
                                    zIndex: 4,
                                    border: option.selected ? '2px solid #000' : 'none',
                                    marginTop: '1px',
                                    marginLeft: '1px',
                                }}
                                onClick={() => {
                                    if (config && config.override && config.onMoveInput) {
                                        config.onMoveInput("from", option.from, option.san)
                                        dispatch(setMoveOptionSelected(option))
                                    }
                                }}
                            />)
                    }
                }
                if (!toMap.get(option.to)) {
                    toMap.set(option.to, 1);
                    const toSqPos = convertPosToSquare(option.to, view);
                    toSqPos && squares.push(
                        <SquareIndicator key={`${index + 1}_${option.to}`} x={toSqPos.col} y={toSqPos.row}
                            type="selection" clickable={true}
                            style={{
                                zIndex: 4,
                                border: option.selected ? '2px dotted #000' : 'none',
                                borderRadius: '4px',
                                marginTop: 0,
                                background: option.selected ? '#a3b3f7' : 'none' //'#f7f68b'
                            }}
                            onClick={() => {
                                if (config && config.override && config.onMoveInput)
                                    config.onMoveInput("to", option.to, option.san)
                            }}
                        />)
                }
            })
        }
        return squares
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
                    color='#f7d881'
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
            />
            {renderPieces(board)}
            {!readOnly && showLegalMoves && highlightLegalMoves(state)}
            {highlightLastMovePlayed(state)}
            {state.moveOptions && state.moveOptions.length > 0 && showMoveOptions(state)}
        </BoardWrapper>
    )
}

Board.defaultProps = defaultProps;

export default Board
