import {
  Board,
  DELETE_CARD,
  MOVE_CARD,
  ADD_CARD,
  DELETE_LIST,
  CHANGE_LIST_TITLE,
  FETCH_BOARD_DATA,
  ADD_LIST,
} from "../actions/types";
import { ListsById } from "../types";

export default (state: ListsById = {}, action: Board) => {
  switch (action.type) {
    case FETCH_BOARD_DATA:
      return action.payload.data[1].data;
    case ADD_LIST: {
      const { newLists } = action.payload;

      return newLists;
    }
    case CHANGE_LIST_TITLE: {
      return action.payload;
    }
    case DELETE_LIST: {
      const { restOfLists } = action.payload;
      return restOfLists;
    }

    case ADD_CARD: {
      const { newLists } = action.payload;
      return newLists;
    }
    case MOVE_CARD:
      return { ...action.payload };
    case DELETE_CARD: {
      const { newCards } = action.payload;
      return newCards;
    }
    default:
      return state;
  }
};
