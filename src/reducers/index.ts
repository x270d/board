import { combineReducers } from "redux";
import listsById from "./listsReducer";
import cardsById from "./cardsReducer";
import board from "./boardReducer";

export const rootReducer = combineReducers({
  listsById,
  cardsById,
  board,
});

export type RootState = ReturnType<typeof rootReducer>;
