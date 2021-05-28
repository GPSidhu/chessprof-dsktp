import { BoardState } from "../../components/types";
import { Action } from "../actions";
import { ACTIONS } from "../constants";
import { isPromotion, isNewMove } from "../../utils";
import { VIEW } from "../../constants";
import { Square } from "chess.js";

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
	navInstance: new Chess(),
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
	moveOptions: [],
};

export const boardReducer = (
	state: BoardState = initialState,
	action: Action
) => {
	const chessInstance = state.chess;
	const navInstance = state.navInstance;
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
					turn: chessInstance.turn(),
					inCheck: chessInstance.in_check(),
					inCheckmate: chessInstance.in_checkmate(),
					inStalemate: chessInstance.in_stalemate(),
					inDraw: chessInstance.in_draw(),
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
					turn: chessInstance.turn(),
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
			const prevMove = state.history[prevMoveIndex];
			navInstance.load(prevMove.fen || "");
			return {
				...state,
				navInstance: navInstance,
				board: navInstance.board(),
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
			navInstance.load(nextMove.fen || "");
			return {
				...state,
				navInstance: navInstance,
				board: navInstance.board(),
				current: nextMoveIndex,
				lastMove: {
					from: nextMove.from,
					to: nextMove.to,
				},
			};

		case ACTIONS.FIRST_MOVE:
			navInstance.load(state.history[0].fen || "");
			return {
				...state,
				navInstance: navInstance,
				board: navInstance.board(),
				current: 0,
				lastMove: {
					from: "",
					to: "",
				},
			};

		case ACTIONS.LATEST_MOVE:
			const latestMove = state.history[state.history.length - 1];
			return {
				...state,
				board: chessInstance.board(),
				current: state.history.length - 1,
				lastMove: {
					from: latestMove.from,
					to: latestMove.to,
				},
			};

		case ACTIONS.RESET_BOARD:
			chessInstance.reset();
			navInstance.reset();
			return {
				chess: chessInstance,
				navInstance: navInstance,
				board: chessInstance.board(),
				inCheck: false,
				inCheckmate: false,
				inStalemate: false,
				inDraw: false,
				turn: chessInstance.turn(),
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

		case ACTIONS.SET_MOVE_OPTIONS:
			const options: string[] = action.payload;
			const currentFen = state.history[state.history.length - 1].fen;
			const moveOptions: Array<{
				from: Square;
				to: Square;
				san: string;
			}> = [];
			options &&
				options.forEach((sanMove) => {
					// Need to conver the sanMove into {from: <Square>, to: <Square>} format
					// load current state in a new instance
					const _helper = new Chess();
					_helper.load(currentFen);
					let moveValid = _helper.move(sanMove);
					if (moveValid) {
						console.log(
							"move options=> from: " +
								moveValid.from +
								" , to: " +
								moveValid.to
						);
						moveOptions.push({
							from: moveValid.from,
							to: moveValid.to,
							san: sanMove,
						});
					}
				});
			return {
				...state,
				moveOptions: [...moveOptions],
			};

		case ACTIONS.SET_MOVE_OPTION_SELECTED:
			// cases:
			// Single target square:  from and to are unique
			// Mutliple target square: from is same for multiple options
			let newMoveOptions = state.moveOptions;
			if (newMoveOptions) {
				newMoveOptions.forEach((o) => {
					o.selected = o.from === action.payload.from;
				});
			}
			return {
				...state,
				moveOptions: newMoveOptions,
			};
		default:
			return state;
	}
};
