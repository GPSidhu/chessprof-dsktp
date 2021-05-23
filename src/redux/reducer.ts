import { BoardState } from "../components/types";
import { Action } from "./actions";
import { ACTIONS } from "./constants";
import { isPromotion } from "../utils";
import { VIEW } from "../constants";

const Chess = require("chess.js");
const initialState: BoardState = {
	playerW: "White Player",
	playerB: "Black Player",
	turn: "w",
	board: new Chess().board(),
	selectedPiece: "",
	legalMoves: [],
	chess: new Chess(),
	view: VIEW.WHITE,
	showSquareMarkings: false,
	showLegalMoves: true,
};

export const boardReducer = (
	state: BoardState = initialState,
	action: Action
) => {
	switch (action.type) {
		case ACTIONS.LOAD_FEN:
			const chFen = state.chess;
			chFen.load(action.payload);
			return { ...state, chess: chFen, board: chFen.board() };

		case ACTIONS.LOAD_PGN:
			const chPgn = state.chess;
			chPgn.load_pgn(action.payload);
			return { ...state, chess: chPgn, board: chPgn.board() };

		case ACTIONS.ROTATE_BOARD:
			return {
				...state,
                view: state.view === VIEW.WHITE ? VIEW.BLACK : VIEW.WHITE
			};

		case ACTIONS.TOGGLE_MARKINGS:
			return {
				...state,
				showSquareMarkings: !state.showSquareMarkings,
			};

		case ACTIONS.TOGGLE_MOVE_INDICATOR:
			return {
				...state,
				showLegalMoves: !state.showLegalMoves,
            };

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
				moved = state.chess.move({
					from: piece.from,
					to: piece.to,
					promotion: "q",
				});
			else moved = state.chess.move({ from: piece.from, to: piece.to });

			if (moved) {
				console.log(
					piece.type + " moved from " + piece.from + " to " + piece.to
				);
				return {
					...state,
					lastMove: { from: piece.from, to: piece.to },
					board: state.chess.board(),
				};
            }
            // to do:
            // checkmate, stalemate, draw, in check
			return state;

		default:
			return state;
	}
};
