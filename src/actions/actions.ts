import {
  FETCH_BOARD_DATA,
  MOVE_LIST,
  MOVE_CARD,
  ADD_LIST,
  CHANGE_CARD_TEXT,
  ADD_CARD,
  DELETE_LIST,
  CHANGE_LIST_TITLE,
  DELETE_CARD,
  Board,
} from "./types";
import { Dispatch } from "redux";
import shortid from "shortid";

import boards from "../api/boards";

import { State, MoveCard, MoveList } from "../types";

export const getFetchBoard = () => async (dispatch: Dispatch) => {
  const response1 = await boards.get("/board.json");
  const response2 = await boards.get("/listsById.json");
  const response3 = await boards.get("/cardsById.json");
  Promise.all([response1, response2, response3]).then(
    ([response1, response2, response3]) => {
      dispatch(fetchData([response1, response2, response3]));
    }
  );
};

export const fetchData = (data: any) => {
  return {
    type: FETCH_BOARD_DATA,
    payload: { data },
  };
};

export const moveList = (oldListIndex: number, newListIndex: number) => async (
  dispatch: Dispatch<Board>,
  getState: () => State
) => {
  const state = getState().board;
  const newLists = Array.from(state.lists);
  const [removedList] = newLists.splice(oldListIndex, 1);
  newLists.splice(newListIndex, 0, removedList);

  dispatch({ type: MOVE_LIST, payload: newLists });
  boards.put("/board.json", { lists: newLists });
};

export const moveCard = ({
  sourceListId,
  destListId,
  oldCardIndex,
  newCardIndex,
}: MoveCard & MoveList) => async (
  dispatch: Dispatch<Board>,
  getState: () => State
) => {
  const state = getState().listsById;
  if (sourceListId === destListId) {
    const newCards: string[] = Array.from(state[sourceListId].cards);
    const [removedCard] = newCards.splice(oldCardIndex, 1);
    newCards.splice(newCardIndex, 0, removedCard);
    const newState = {
      ...state,
      [sourceListId]: { ...state[sourceListId], cards: newCards },
    };

    dispatch({
      type: MOVE_CARD,
      payload: newState,
    });
    await boards.patch("/listsById.json", newState);
  } else {
    const sourceCards = Array.from(getState().listsById[sourceListId].cards);
    const [removedCard] = sourceCards.splice(oldCardIndex, 1);
    const destinationCards = Array.from(getState().listsById[destListId].cards);
    destinationCards.splice(newCardIndex, 0, removedCard);
    const newState = {
      ...state,
      [sourceListId]: { ...state[sourceListId], cards: sourceCards },
      [destListId]: { ...state[destListId], cards: destinationCards },
    };

    dispatch({
      type: MOVE_CARD,
      payload: newState,
    });
    await boards.patch("/listsById.json", newState);
  }
};

export const addList = (title?: string, listId?: string) => async (
  dispatch: Dispatch<Board>,
  getState: () => State
) => {
  const id = shortid.generate();
  const state = getState().board.lists;
  const lists = getState().listsById;

  const newLists = {
    ...lists,
    [id]: { id: id, title: title, cards: [] },
  };

  dispatch({
    type: ADD_LIST,
    payload: { listId: id, listTitle: title, newLists },
  });
  await boards.put("/board.json", { lists: [...state, id] });
  await boards.put("/listsById.json", newLists);
};

export const addNewCard = (
  cardText: string,
  cardId: string,
  listId: string,
  data: string
) => async (dispatch: Dispatch<Board>, getState: () => State) => {
  const stateList: any = getState().listsById;
  const stateCards = getState().cardsById;
  const newLists = {
    ...stateList,
    [listId]: {
      ...stateList[listId],
      cards: [...stateList[listId].cards, cardId],
    },
  };

  const newCard = {
    ...stateCards,
    [cardId]: { text: cardText, id: cardId, data: data },
  };

  dispatch({
    type: ADD_CARD,
    payload: {
      newLists,
      newCard,
    },
  });
  await boards.put("/listsById.json", newLists);
  await boards.put("/cardsById.json", newCard);
};

export const delList = (listId: string, cards: string[]) => async (
  dispatch: Dispatch<Board>,
  getState: () => State
) => {
  const state = getState().board;
  const list = getState().listsById;
  const filterDeleted = (id: string) => id !== listId;
  const newLists = state.lists.filter(filterDeleted);

  const { [listId]: deletedList, ...restOfLists } = list;

  dispatch({
    type: DELETE_LIST,
    payload: { listId, cards, newLists, restOfLists },
  });
  await boards.put("/board.json", { lists: newLists });
  await boards.put("/listsById.json", { ...restOfLists });
};

export const changeListTitle = (listId: string, title: string) => async (
  dispatch: Dispatch<Board>,
  getState: () => State
) => {
  const state = getState().listsById;

  const newLists = {
    ...state,
    [listId]: { ...state[listId], title: title },
  };
  dispatch({
    type: CHANGE_LIST_TITLE,
    payload: newLists,
  });

  await boards.put("/listsById.json", newLists);
};

export const delCard = (id: number, listId: string) => async (
  dispatch: Dispatch<Board>,
  getState: () => State
) => {
  const stateList = getState().listsById;
  const stateCards = getState().cardsById;

  const { [id]: deletedCard, ...restOfCards } = stateCards;

  const deleted = (card: any) => card !== id;
  const newCards = {
    ...stateList,
    [listId]: {
      ...stateList[listId],
      cards: stateList[listId].cards.filter(deleted),
    },
  };

  dispatch({
    type: DELETE_CARD,
    payload: { newCards, restOfCards },
  });
  await boards.put("/listsById.json", newCards);
  await boards.put("/cardsById.json", restOfCards);
};

export const changeCardText = (
  id: number,
  text: string,
  date: Date,
  desc: string
) => async (dispatch: Dispatch<Board>, getState: () => State) => {
  const state = getState().cardsById;
  const newTitle = {
    ...state,
    [id]: { ...state[id], text: text, data: date, description: desc },
  };
  dispatch({
    type: CHANGE_CARD_TEXT,
    payload: newTitle,
  });
  await boards.put("/cardsById.json", newTitle);
};
