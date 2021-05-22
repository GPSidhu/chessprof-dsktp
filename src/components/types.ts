import { PieceType, ChessInstance, Move, Square } from "chess.js";
import { VIEW } from "../constants";

export interface BoardSquare {
    x: number       // left in px
    y: number       // top in px
    row?: number     // 0 to 7 in board[][]
    col?: number     // 0 to 7 in board[][]
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
	boardSize: number;
    view: VIEW;
    showSquareMarkings: boolean;
    showLegalMoves: boolean
}
