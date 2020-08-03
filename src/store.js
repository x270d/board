import { combineReducers, createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";

const board = (state = { lists: [] }, action) => {
  switch (action.type) {
    case "ADD_LIST": {
      const { listId } = action.payload;
      console.log(state.lists);
      return { lists: [...state.lists, listId] };
    }
    case "MOVE_LIST": {
      return { lists: action.payload };
    }
    case "DELETE_LIST": {
      const { listId } = action.payload;
      const filterDeleted = (tmpListId) => tmpListId !== listId;
      const newLists = state.lists.filter(filterDeleted);
      return { lists: newLists };
    }
    case "FETCH_STREAMS":
      console.log(action.payload);
      return;
    default:
      return state;
  }
};

const listsById = (state = {}, action) => {
  switch (action.type) {
    case "ADD_LIST": {
      const { listId, listTitle } = action.payload;
      return {
        ...state,
        [listId]: { _id: listId, title: listTitle, cards: [] },
      };
    }
    case "CHANGE_LIST_TITLE": {
      const { listId, listTitle } = action.payload;
      return {
        ...state,
        [listId]: { ...state[listId], title: listTitle },
      };
    }
    case "DELETE_LIST": {
      const { listId } = action.payload;
      const { [listId]: deletedList, ...restOfLists } = state;
      return restOfLists;
    }
    case "ADD_CARD": {
      const { listId, cardId } = action.payload;
      return {
        ...state,
        [listId]: { ...state[listId], cards: [...state[listId].cards, cardId] },
      };
    }
    case "MOVE_CARD":
      return { ...action.payload };
    case "MOVE_CARDS":
      return { ...action.payload };
    case "DELETE_CARD": {
      const { cardId: deletedCardId, listId } = action.payload;
      const filterDeleted = (cardId) => cardId !== deletedCardId;
      return {
        ...state,
        [listId]: {
          ...state[listId],
          cards: state[listId].cards.filter(filterDeleted),
        },
      };
    }
    default:
      return state;
  }
};

const cardsById = (state = {}, action) => {
  switch (action.type) {
    case "ADD_CARD": {
      const { cardText, cardId } = action.payload;
      return { ...state, [cardId]: { text: cardText, _id: cardId } };
    }
    case "CHANGE_CARD_TEXT": {
      const { cardText, cardId } = action.payload;
      return { ...state, [cardId]: { ...state[cardId], text: cardText } };
    }
    case "DELETE_CARD": {
      const { cardId } = action.payload;
      const { [cardId]: deletedCard, ...restOfCards } = state;
      return restOfCards;
    }
    // Find every card from the deleted list and remove it
    case "DELETE_LIST": {
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

const reducers = combineReducers({
  board,
  listsById,
  cardsById,
});

// const saveState = (state) => {
//   try {
//     const serializedState = JSON.stringify(state);
//     localStorage.setItem("state", serializedState);
//   } catch {
//     // ignore write errors
//   }
// };

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const persistedState = loadState();
const store = createStore(reducers, persistedState, applyMiddleware(thunk));

// store.subscribe(
//   throttle(() => {
//     saveState(store.getState());
//   }, 1000)
// );

// console.log(store.getState());
// if (!store.getState().board.lists.length) {
//   console.log("SEED");
//   seed(store);
// }

export default store;
