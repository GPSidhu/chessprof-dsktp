import { createStore } from "redux";
// import { boardReducer } from "./reducer";
import rootReducer from './reducers'

export const store = createStore(rootReducer);
