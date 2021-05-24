import { OpeningState } from "../../components/types";
import { Action } from "../actions";
import { ACTIONS } from "../constants";

const initialState: OpeningState = {
	opening: { id: "-1", title: "default Opening" },
};

export const openingsReducer = (
	state: OpeningState = initialState,
	action: Action
) => {
	switch (action.type) {
		case ACTIONS.SELECT_OPENING:
			// (action.payload)
			return {
				...state,
				opening: { ...action.payload },
			};
		default:
			return state;
	}
};
