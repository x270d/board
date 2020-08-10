import {
  FETCH_BOARD_DATA,
  ADD_NEW_BOARD,
  DEL_NAV,
  Board,
} from "../actions/types";

export default (state = {}, action: Board) => {
  switch (action.type) {
    case FETCH_BOARD_DATA: {
      return action.payload.data[3].data;
    }
    case ADD_NEW_BOARD: {
      const { newOrder } = action.payload;
      return newOrder;
    }
    case DEL_NAV: {
      const { newOrderBoard } = action.payload;
      return newOrderBoard;
    }
    default:
      return state;
  }
};
