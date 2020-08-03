import {
  Board,
  FETCH_BOARD_DATA,
  ADD_LIST,
  MOVE_LIST,
  DELETE_LIST,
} from "../actions/types";

export default (state = { lists: [] }, action: Board) => {
  switch (action.type) {
    case FETCH_BOARD_DATA:
      return action.payload.data[0].data;
    case ADD_LIST: {
      const { listId } = action.payload;

      return { lists: [...state.lists, listId] };
    }
    case MOVE_LIST: {
      return { lists: action.payload };
    }
    case DELETE_LIST: {
      const { newLists } = action.payload;
      return { lists: newLists };
    }
    default:
      return state;
  }
};
