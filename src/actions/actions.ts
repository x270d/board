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
  ADD_NEW_BOARD,
  DEL_NAV,
  Board,
} from "./types";
import { Dispatch } from "redux";
import shortid from "shortid";
import boards from "../api/boards";
import { State, MoveCard, MoveList } from "../types";

// response специально не передается в dispatch

export const getFetchBoard = () => async (dispatch: Dispatch) => {
  const response1 = await boards.get("/board.json");
  const response2 = await boards.get("/listsById.json");
  const response3 = await boards.get("/cardsById.json");
  const response4 = await boards.get("/boardsOrder.json");
  Promise.all([response1, response2, response3, response4]).then(
    ([response1, response2, response3, response4]) => {
      dispatch(fetchData([response1, response2, response3, response4]));
    }
  );
};

export const fetchData = (data: any) => {
  return {
    type: FETCH_BOARD_DATA,
    payload: { data },
  };
};

export const addNewBoard = (title: string) => async (
  dispatch: Dispatch<Board>,
  getState: () => State
) => {
  const orderBoard = getState().boardOrder;
  const state = getState().board;
  const id = shortid.generate();

  const newBoard = {
    ...state,
    [id]: {
      id: id,
      title: title,
      lists: [],
    },
  };

  const newOrder = {
    order: [...orderBoard.order, id],
  };

  dispatch({
    type: ADD_NEW_BOARD,
    payload: { newOrder, newBoard },
  });

  await boards.put("/board.json", newBoard);
  await boards.put("/boardsOrder.json", newOrder);
};

export const delNav = (id: string, history: any) => async (
  dispatch: Dispatch<Board>,
  getState: () => State
) => {
  const orderBoard = getState().boardOrder;
  const state = getState().board;

  const arrOrder = orderBoard.order;
  const newOrder = arrOrder.filter((idx: string) => idx !== id);
  const newOrderBoard = {
    order: newOrder || [],
  };
  const { [id]: deletedList, ...restOfLists } = state;

  dispatch({
    type: DEL_NAV,
    payload: { restOfLists, newOrderBoard },
  });

  await boards.put("/board.json", { ...restOfLists });
  await boards.put("/boardsOrder.json", newOrderBoard);
  history.push(`/`);
};

export const moveList = (
  oldListIndex: number,
  newListIndex: number,
  boardId: string
) => async (dispatch: Dispatch<Board>, getState: () => State) => {
  const state = getState().board;
  const boardListId = state[boardId].lists;
  const newLists = Array.from(boardListId);
  const [removedList] = newLists.splice(oldListIndex, 1);
  newLists.splice(newListIndex, 0, removedList);
  const title = state[boardId].title;

  const newBoardList = {
    ...state,
    [boardId]: {
      title: title,
      id: boardId,
      lists: newLists,
    },
  };

  dispatch({ type: MOVE_LIST, payload: newBoardList });
  await boards.patch("/board.json", newBoardList);
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
    const sourceCards = Array.from(state[sourceListId].cards) || [];
    const [removedCard] = sourceCards.splice(oldCardIndex, 1);
    // костыль lives matter
    const destinationCards = state[destListId].cards
      ? Array.from(state[destListId].cards)
      : [];
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

export const addList = (
  title: string,
  boardId: string,
  boardTitle: string
) => async (dispatch: Dispatch<Board>, getState: () => State) => {
  const id = shortid.generate();
  const state: any = getState().board;
  const lists = getState().listsById;

  const newLists = {
    ...lists,
    [id]: { id: id, title: title, cards: [] },
  };

  const boardListId = state[boardId].lists;

  const newBoardList = {
    ...state,
    [boardId]: {
      id: boardId,
      title: boardTitle,
      lists: boardListId ? [...boardListId, id] : [id],
    },
  };

  dispatch({
    type: ADD_LIST,
    payload: { newLists, newBoardList },
  });
  await boards.put("/board.json", newBoardList);
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
  const list = stateList[listId].cards
    ? [...stateList[listId].cards, cardId]
    : [cardId];

  const newLists = {
    ...stateList,
    [listId]: {
      ...stateList[listId],
      cards: list,
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

export const delList = (
  listId: string,
  cards: string[],
  boardId: string,
  boardTitle: string
) => async (dispatch: Dispatch<Board>, getState: () => State) => {
  const state = getState().board;
  const list = getState().listsById;
  const boardListId = state[boardId].lists;
  const filterDeleted = (id: string) => id !== listId;
  const lists = boardListId.filter(filterDeleted);

  const newLists = {
    ...state,
    [boardId]: {
      id: boardId,
      title: boardTitle,
      lists: lists,
    },
  };

  const { [listId]: deletedList, ...restOfLists } = list;

  dispatch({
    type: DELETE_LIST,
    payload: { listId, cards, newLists, restOfLists },
  });

  await boards.put("/board.json", newLists);
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
