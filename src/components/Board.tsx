import { ChessInstance } from 'chess.js';
import React, { ReactElement, useEffect, useState, RefObject } from 'react'
import styled from 'styled-components'
import { VIEW } from '../constants/enums'

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
    fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    view: VIEW.WHITE,
    pgn: ''
}

type BoardProps = {
    parent?: RefObject<HTMLDivElement> | undefined | null,
    fen?: string | null | '',
    pgn?: string | null | '',
    view?: VIEW,
    parentWidth?: number,
} & typeof defaultProps;

const Board = ({
    fen,
    pgn,
    view,
    parent
}: BoardProps): ReactElement => {
    const [boardSize, setBoardSize] = useState<number>(DEFAULT_BOARD_SIZE);
    const [chess, setChess] = useState<ChessInstance>(new Chess());
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
        } catch(e) {
            console.error("Error loading fen|pgn: " + e.toString())
        }

    }, []);
    // console.log(chess.board())
    return (
        <BoardContainer style={{ width: boardSize + 'px', height: boardSize + 'px' }}>
            <BoardImage alt="Chessboard" src={`/images/chessboard-${view}.png`} style={{ width: boardSize + 'px', height: boardSize + 'px' }} />
        </BoardContainer>
    )
}

Board.defaultProps = defaultProps;

export default Board
