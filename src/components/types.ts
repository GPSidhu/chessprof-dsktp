// third party
import { PieceType, ChessInstance, Move, ShortMove, Square } from "chess.js";

// src
import { VIEW } from "../constants";


/* *********** Board type definitions *********** */
export interface BoardSquare {
	x: number; // left in px
	y: number; // top in px
	row: number; // 0 to 7 in board[][]
	col: number; // 0 to 7 in board[][]
	name?: string; // "e4", "g2", ...
	file?: string; // "a", "b", "c", "d", "e", "f", "g", "h"
	rank?: number; // 1 to 8
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
	navInstance: ChessInstance; // use for prev|next|first|latest move navigation to update board state without changing actual game instance
	view: VIEW;
	showSquareMarkings: boolean;
	showLegalMoves: boolean;
	history: HistoryMove[];
	current: number; //index of history[]
    moveOptions?: [{ from: Square; to: Square, san: string, selected?: boolean }] | [];
    inCheck?: boolean
    inCheckmate?: boolean
    inStalemate?: boolean
    inDraw?: boolean
    readOnly?: boolean
}

export type PanelOverrides =
	| { override?: false }
	| {
			override: true;
			next: () => void;
			prev: () => void;
			first: () => void;
            latest: () => void;
            onMoveInput?: (type: "from" | "to", square: Square, san: string) => void;
	  };

export interface HistoryMove {
	from: string;
	to: string;
	fen?: string;
}

export interface NextMove {
	move: string | ShortMove;
	type: "sm" | "san";
	// sm -> ShortMove({from: "e4", to: "e5"})
	// san -> standard algebraic notation ("Ne4")
}

/* *********************************************** */

/* *********** Opening type definitions *********** */

export interface ConditionalMove {
	options: { [key: string]: Array<Array<string | ConditionalMove>> };
	msg?: string | null | undefined;
}

export interface Opening {
	id: string | number;
    title?: string;
    thumbnail?: string;
	moves?: Array<Array<string | ConditionalMove>>;
}

export interface OpeningState {
	opening: Opening;
}

/* ********************************************* */

// Application state
export interface AppState {
	boardState: BoardState;
    openingState: OpeningState;
    gameState: GameState;
}

/* *********** Player type definitions *********** */

export interface Player<T> {
    id: number | string;
    name?: string;
    email?: string;
    rating?: number;
    type: "human" | "engine";
    color: T;
    won?: number;
    lost?: number;
    timer?: number
    // epoch timestamp : idea is to store the timer in the state and compare it
    // to the time of rendering for session restoration with timer continuation
}

/* ********************************************* */

/* *********** Game type definitions *********** */

export interface GameState {
    mode?: "online" | "offline";
    playerW?: Player<"w">;
    playerB?: Player<"b">;
    isLive: boolean;
    isGameOver: boolean;
    winner?: Player<"w" | "b"> | "none"
    draw?: boolean
}

/* ********************************************* */