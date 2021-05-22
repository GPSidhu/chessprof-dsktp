import { PieceType, ChessInstance, Move, Square } from "chess.js";
// import { VIEW } from "../constants";
import { Action } from "./actions";
import { ACTIONS } from "./constants";
import { isPromotion } from "../utils";

const Chess = require("chess.js");
export interface BoardState {
	playerW: string;
	playerB: string;
	turn: "w" | "b";
    board: Array<Array<{ type: PieceType; color: "w" | "b" } | null>>;
    lastMove?: {from: Square, to: Square};
	selectedPiece: string | null;
	legalMoves: Move[];
	chess: ChessInstance;
	boardSize: number;
}

const initialState: BoardState = {
	playerW: "White Player",
	playerB: "Black Player",
	turn: "w",
	board: new Chess().board(),
	selectedPiece: "",
	legalMoves: [],
	chess: new Chess(),
	boardSize: 720,
};

export const boardReducer = (
	state: BoardState = initialState,
	action: Action
) => {
	if (!action.payload) return state;
	switch (action.type) {
		case ACTIONS.LOAD_FEN:
			const chFen = state.chess;
			chFen.load(action.payload);
			return { ...state, chess: chFen, board: chFen.board() };

		case ACTIONS.LOAD_PGN:
			const chPgn = state.chess;
			chPgn.load_pgn(action.payload);
			return { ...state, chess: chPgn, board: chPgn.board() };

		case ACTIONS.UPDATE_BOARD_SIZE:
			return { ...state, boardSize: action.payload };

		case ACTIONS.PIECE_CLICKED:
			const chess = state.chess;
			if (state.selectedPiece === action.payload)
				return { ...state, selectedPiece: "", legalMoves: [] };

			const legalMoves = chess.moves({
				square: action.payload,
				verbose: true,
			});
			return {
				...state,
				selectedPiece: action.payload,
				legalMoves: legalMoves,
			};

		case ACTIONS.PIECE_MOVED:
			const piece = action.payload;
			// try to make the move
			
            let moved;
            if (isPromotion(piece.type, piece.color, piece.to))
                moved = state.chess.move({ from: piece.from, to: piece.to, promotion: 'q' });
            else
                moved = state.chess.move({ from: piece.from, to: piece.to});

			if (moved) {
				console.log(
					piece.type + " moved from " + piece.from + " to " + piece.to
				);
				return { ...state, lastMove: {from: piece.from, to: piece.to}, board: state.chess.board() };
			}
			return state;

		default:
			return state;
	}
};
