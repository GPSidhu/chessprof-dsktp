import { GameState } from "../../components/types";
import { Action } from "../actions";
import { ACTIONS } from "../constants";

const initialState: GameState = {
	isLive: false,
	isGameOver: false,
	winner: "none",
	draw: false,
};

export const gameReducer = (
	state: GameState = initialState,
	action: Action
) => {
	switch (action.type) {
		case ACTIONS.LOAD_NEW_GAME:
			return {
				...state,
				playerB: {
					...action.payload.playerB,
					timer: action.payload.timeFormat.duration,
				},
				playerW: {
					...action.payload.playerW,
					timer: action.payload.timeFormat.duration,
				},
				mode: action.payload.mode,
				timeFormat: action.payload.timeFormat,
			};

		default:
			return state;
	}
};
