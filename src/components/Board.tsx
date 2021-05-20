import { ChessInstance } from 'chess.js';
import React, { ReactElement, useEffect, useState, RefObject } from 'react'
import styled from 'styled-components'
import { VIEW, FILES } from '../constants'
import { PieceType } from "chess.js"
import Piece from './Piece';

const Chess = require('chess.js')
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
    fen: 'nbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    view: VIEW.WHITE,
    pgn: '',
    readOnly: false
}

type BoardProps = {
    parent?: RefObject<HTMLDivElement> | undefined | null,
    fen?: string | null | '',
    pgn?: string | null | '',
    view?: VIEW,
    readonly?: boolean
} & typeof defaultProps;

const Board = ({
    fen,
    pgn,
    view,
    parent
}: BoardProps): ReactElement => {
    const [boardSize, setBoardSize] = useState<number>(DEFAULT_BOARD_SIZE);
    const [chess] = useState<ChessInstance>(new Chess());
    useEffect(() => {
        if (parent?.current) {
            let rect = parent?.current.getBoundingClientRect();
            let parentSize = Math.min(rect.width, rect.height);
            setBoardSize(parentSize > DEFAULT_BOARD_SIZE ? DEFAULT_BOARD_SIZE : parentSize - 60);
        }
        try {
            if (fen) {
                chess.load(fen)
            } else if (pgn) {
                chess.load_pgn(pgn);
            }
            console.log("New board initialized")
        } catch(e) {
            console.error("Error loading fen|pgn: " + e.toString())
        }

    }, [parent, fen, pgn, chess]);
    
    const renderPieces = (board: ({
        type: PieceType;
        color: "b" | "w";
    } | null)[][]) => {
        let pieces: ReactElement[] = []
        board && board.forEach((rank, row) => {
            rank.forEach((square, col) => {
                if (square) {
                    pieces.push(<Piece 
                                pos={`${FILES[col]}${row+1}`} 
                                color={square.color}
                                x={col*boardSize/8}
                                y={row*boardSize/8}
                                size={boardSize/8}
                                type={square.type}
                            />)
                }
            })
        })
        return pieces
    }

    return (
        <BoardContainer style={{ width: boardSize + 'px', height: boardSize + 'px' }}>
            <BoardImage alt="Chessboard" src={`/images/chessboard-${view}.png`} style={{ width: boardSize + 'px', height: boardSize + 'px' }} />
            {renderPieces(chess.board())}
        </BoardContainer>
    )
}

Board.defaultProps = defaultProps;

export default Board
