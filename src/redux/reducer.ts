import { PieceType, ChessInstance, Move } from "chess.js";
import { Action } from "./actions";

const Chess = require('chess.js')
export interface BoardState {
	playerW: string;
	playerB: string;
	turn: "w" | "b";
	board: Array<Array<{ type: PieceType; color: "w" | "b" } | null>>;
	selectedPiece: string | null;
	legalMoves: Move[];
	chess: ChessInstance;
}

const initialState: BoardState = {
	playerW: "White Player",
	playerB: "Black Player",
	turn: "w",
	board: new Chess().board(),
	selectedPiece: "",
	legalMoves: [],
	chess: new Chess()
};

export const boardReducer = (
	state: BoardState = initialState,
	action: Action
) => {
	switch (action.type) {
		case "PIECE_CLICKED":
            debugger;
            const chess = state.chess;
            const legalMoves = chess.moves({square: action.payload, verbose: true});
			return { ...state, selectedPiece: action.payload, legalMoves: legalMoves};

		// case "PIECE_MOVED":
		// 	return ;
		default:
			return state;
	}
};
