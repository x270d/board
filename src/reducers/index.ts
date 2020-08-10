import { combineReducers } from "redux";
import listsById from "./listsReducer";
import cardsById from "./cardsReducer";
import board from "./boardReducer";
import boardOrder from "./boardOrderReducer";

export const rootReducer = combineReducers({
  listsById,
  cardsById,
  board,
  boardOrder,
});

export type RootState = ReturnType<typeof rootReducer>;
