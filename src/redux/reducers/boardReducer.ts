import { BoardState } from "../../components/types";
import { Action } from "../actions";
import { ACTIONS } from "../constants";
import { isPromotion, isNewMove } from "../../utils";
import { VIEW } from "../../constants";

const Chess = require("chess.js");
const INIT_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

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
	// opening: { id: "1" },
	history: [
		{
			from: "",
			to: "",
			fen: INIT_FEN,
		},
	],
	current: 0,
};

export const boardReducer = (
	state: BoardState = initialState,
	action: Action
) => {
	let chessInstance = state.chess;
	switch (action.type) {
		case ACTIONS.LOAD_FEN:
			chessInstance.load(action.payload);
			return {
				...state,
				chess: chessInstance,
				board: chessInstance.board(),
			};

		case ACTIONS.LOAD_PGN:
			// to do: get history and update state.history with fen for each position
			try {
				console.log("Trying to load pgn");
				chessInstance.load_pgn(action.payload);
			} catch (e) {
				console.error(
					"Error loading pgn: " +
						action.payload +
						" Error: " +
						e.toString()
				);
			}
			return {
				...state,
				chess: chessInstance,
				board: chessInstance.board(),
			};

		case ACTIONS.SET_VIEW:
			return {
				...state,
				view: action.payload,
			};

		case ACTIONS.ROTATE_BOARD:
			return {
				...state,
				view: state.view === VIEW.WHITE ? VIEW.BLACK : VIEW.WHITE,
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
			if (!isNewMove(state)) return state;
			if (state.selectedPiece === action.payload)
				return { ...state, selectedPiece: "", legalMoves: [] };

			const legalMoves = chessInstance.moves({
				square: action.payload,
				verbose: true,
			});

			return {
				...state,
				selectedPiece: action.payload,
				legalMoves: legalMoves,
			};

		case ACTIONS.PIECE_MOVED:
			if (!isNewMove(state)) return state;

			const piece = action.payload;
			// try to make the move
			let moved;
			// move type is in 'SAN'
			if ("move" in action.payload && action.payload.type === "san") {
				moved = chessInstance.move(action.payload.move);
			} else {
				if (isPromotion(piece.type, piece.color, piece.to))
					moved = chessInstance.move({
						from: piece.from,
						to: piece.to,
						promotion: "q",
					});
				else
					moved = chessInstance.move({
						from: piece.from,
						to: piece.to,
					});
			}
			if (moved) {
				// update fen history
				console.log(
					piece.type + " moved from " + moved.from + " to " + moved.to
				);
				return {
					...state,
					lastMove: { from: moved.from, to: moved.to },
					selectedPiece: "",
					legalMoves: [],
					chess: chessInstance,
					board: chessInstance.board(),
					history: [
						...state.history,
						{
							from: moved.from,
							to: moved.to,
							fen: chessInstance.fen(),
						},
					],
					current: state.current + 1,
				};
			}
			// to do:
			// checkmate, stalemate, draw, in check
			return state;

		case ACTIONS.UNDO_MOVE:
			if (state.current <= 0) return state;
			// state.current = 0 => no move played, fen:INIT_FEN, from: '', to: ''
			let history = state.history;
			history.pop();
			const lastMove = history[history.length - 1];
			if (lastMove.fen) {
				chessInstance.load(lastMove.fen);
				return {
					...state,
					chess: chessInstance,
					board: chessInstance.board(),
					history: [...history],
					current: state.current - 1,
					lastMove: {
						from: lastMove.from,
						to: lastMove.to,
					},
				};
			}
			return state;

		case ACTIONS.PREVIOUS_MOVE:
			const prevMoveIndex = state.current - 1;
			if (prevMoveIndex < 0) return state;

			// const chPM = state.chess;
			const prevMove = state.history[prevMoveIndex];
			chessInstance.load(prevMove.fen || "");
			return {
				...state,
				chess: chessInstance,
				board: state.chess.board(),
				current: prevMoveIndex,
				lastMove: {
					from: prevMove.from,
					to: prevMove.to,
				},
			};

		case ACTIONS.NEXT_MOVE:
			const nextMoveIndex = state.current + 1;
			if (nextMoveIndex > state.history.length - 1) return state;
			const nextMove = state.history[nextMoveIndex];
			chessInstance.load(nextMove.fen || "");
			return {
				...state,
				chess: chessInstance,
				board: chessInstance.board(),
				current: nextMoveIndex,
				lastMove: {
					from: nextMove.from,
					to: nextMove.to,
				},
			};

		case ACTIONS.FIRST_MOVE:
			chessInstance.load(state.history[0].fen || "");
			return {
				...state,
				chess: chessInstance,
				board: chessInstance.board(),
				current: 0,
			};

		case ACTIONS.LATEST_MOVE:
			chessInstance.load(
				state.history[state.history.length - 1].fen || ""
			);
			const latestMove = state.history[state.history.length - 1];
			return {
				...state,
				chess: chessInstance,
				board: chessInstance.board(),
				current: state.history.length - 1,
				lastMove: {
					from: latestMove.from,
					to: latestMove.to,
				},
			};

		case ACTIONS.RESET_BOARD:
			chessInstance.reset();
			return {
				chess: chessInstance,
				board: chessInstance.board(),
				selectedPiece: "",
				legalMoves: [],
				history: [
					{
						from: "",
						to: "",
						fen: INIT_FEN,
					},
				],
				current: 0,
				view: VIEW.WHITE,
			};
		default:
			return state;
	}
};
