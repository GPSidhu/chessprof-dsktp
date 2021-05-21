import { createStore } from "redux";
import { boardReducer } from "./reducer";

export const store = createStore(boardReducer);
