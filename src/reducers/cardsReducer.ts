import {
  Board,
  FETCH_BOARD_DATA,
  ADD_CARD,
  CHANGE_CARD_TEXT,
  DELETE_CARD,
  DELETE_LIST,
} from "../actions/types";
import { CardsById } from "../types";

export default (state: CardsById = {}, action: Board) => {
  switch (action.type) {
    case FETCH_BOARD_DATA:
      return action.payload.data[2].data;
    case ADD_CARD: {
      const { newCard } = action.payload;
      return newCard;
    }
    case CHANGE_CARD_TEXT: {
      return action.payload;
    }
    case DELETE_CARD: {
      const { restOfCards } = action.payload;
      return restOfCards;
    }
    case DELETE_LIST: {
      const { cards: cardIds } = action.payload;
      return Object.keys(state)
        .filter((cardId) => !cardIds.includes(cardId))
        .reduce(
          (newState, cardId) => ({ ...newState, [cardId]: state[cardId] }),
          {}
        );
    }
    default:
      return state;
  }
};
