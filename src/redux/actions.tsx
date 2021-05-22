import { Square } from 'chess.js';
import { ACTIONS } from './constants'

export type Action = {
    type: string;
    payload: any;
};

export const loadFen = (fen: string): Action => ({
    type: ACTIONS.LOAD_FEN,
    payload: fen
})

export const loadPGN = (pgn: string): Action => ({
    type: ACTIONS.LOAD_PGN,
    payload: pgn
})

export const updateBoardSize = (size: number): Action => ({
    type: ACTIONS.UPDATE_BOARD_SIZE,
    payload: size
})

export const onPieceClick = (piecePos: string): Action => ({
    type: ACTIONS.PIECE_CLICKED,
    payload: piecePos
})

export const onPieceMove = (payload: {from: Square, to: Square, type: string, color:  "b" | "w"}): Action => ({
    type: ACTIONS.PIECE_MOVED,
    payload: payload
})
