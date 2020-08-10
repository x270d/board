import {
  Board,
  FETCH_BOARD_DATA,
  ADD_LIST,
  MOVE_LIST,
  DELETE_LIST,
  ADD_NEW_BOARD,
  DEL_NAV,
} from "../actions/types";
import { BOARD } from "../types";

export default (state: BOARD = {}, action: Board) => {
  switch (action.type) {
    case FETCH_BOARD_DATA:
      return action.payload.data[0].data;
    case ADD_LIST: {
      const { newBoardList } = action.payload;

      return newBoardList;
    }
    case MOVE_LIST: {
      return action.payload;
    }
    case DELETE_LIST: {
      const { newLists } = action.payload;
      return newLists;
    }
    case ADD_NEW_BOARD: {
      const { newBoard } = action.payload;
      return newBoard;
    }
    case DEL_NAV: {
      const { restOfLists } = action.payload;
      return restOfLists;
    }
    default:
      return state;
  }
};
