import { combineReducers } from "redux";
import { boardReducer } from "./boardReducer";
import { gameReducer } from "./gameReducer";
import { openingsReducer } from "./openingsReducer";

export default combineReducers({
	boardState: boardReducer,
	openingState: openingsReducer,
	gameState: gameReducer,
});
