import { PieceType, ChessInstance, Move, ShortMove, Square } from "chess.js";
import { VIEW } from "../constants";

export interface BoardSquare {
    x: number       // left in px
    y: number       // top in px
    row: number     // 0 to 7 in board[][]
    col: number     // 0 to 7 in board[][]
    name?: string    // "e4", "g2", ...
    file?: string    // "a", "b", "c", "d", "e", "f", "g", "h"
    rank?: number    // 1 to 8
}

export interface BoardState {
	playerW: string;
	playerB: string;
	turn: "w" | "b";
	board: Array<Array<{ type: PieceType; color: "w" | "b" } | null>>;
	lastMove?: { from: Square; to: Square };
	selectedPiece: string | null;
	legalMoves: Move[];
	chess: ChessInstance;
    view: VIEW;
    showSquareMarkings: boolean;
    showLegalMoves: boolean;
    opening: Opening;
    history: HistoryMove[],
    current: number //index of history[]
}

export interface HistoryMove {
    from: string
    to: string
    fen?: string
}

export interface NextMove {
    move: string | ShortMove
    type: "sm" | 'san'
    // sm -> ShortMove({from: "e4", to: "e5"})
    // san -> standard algebraic notation ("Ne4")
}

export interface PrevMove {
    undo: boolean
    // true -> chess.undo() revert the board state e.g. in puzzle, learning mode
    // false -> only show the last played move 1 step back, retaining all the moves played so far e.g. in game mode
}

export interface ConditionalMove {
    options: {[key: string]: Array<Array<string | ConditionalMove>>},
    msg?: string | null | undefined
}

export interface Opening {
    id: string | number
    title?: string
    moves?: Array<Array<string | ConditionalMove>>
}

export interface OpeningState {
    opening: Opening
}

export interface AppState {
    boardState: BoardState
    openingState: OpeningState 
}