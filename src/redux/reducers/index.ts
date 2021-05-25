import { combineReducers } from "redux";
import { boardReducer } from "./boardReducer";
import { openingsReducer } from "./openingsReducer";

export default combineReducers({
	boardState: boardReducer,
	openingState: openingsReducer,
});
