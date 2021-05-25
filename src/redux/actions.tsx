import { Square } from 'chess.js';
import { Opening } from '../components/types';
import { VIEW } from '../constants';
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

export const onPieceClick = (piecePos: string): Action => ({
    type: ACTIONS.PIECE_CLICKED,
    payload: piecePos
})

export const onPieceMove = (payload: { from: Square, to: Square, type: string, color: "b" | "w" }): Action => ({
    type: ACTIONS.PIECE_MOVED,
    payload: payload
})

export const setView = (view: VIEW) => ({
    type: ACTIONS.SET_VIEW,
    payload: view
})

export const rotateBoard = () => ({
        type: ACTIONS.ROTATE_BOARD,
    }    
)

export const toggleMarkings = () => ({
    type: ACTIONS.TOGGLE_MARKINGS
})

export const toggleMoveIndicator = () => ({
    type: ACTIONS.TOGGLE_MOVE_INDICATOR
})

export const selectOpening = (payload: Opening) => ({
    type: ACTIONS.SELECT_OPENING,
    payload: payload
})

export const previousMove = () => ({
    type: ACTIONS.PREVIOUS_MOVE
})

export const nextMove = () => ({
    type: ACTIONS.NEXT_MOVE
})

export const firstMove = () => ({
    type: ACTIONS.FIRST_MOVE
})

export const latestMove = () => ({
    type: ACTIONS.LATEST_MOVE
})
