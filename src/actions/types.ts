import {
  ListsById,
  CardsById,
  DelList,
  Add,
  Del,
  NewBoards,
  BOARD,
} from "../types";

export const FETCH_BOARD_DATA = "FETCH_BOARD_DATA";
type FetchBoardData = {
  type: typeof FETCH_BOARD_DATA;
  payload: any;
};

export const ADD_NEW_BOARD = "ADD_NEW_BOARD";
type AddNewBoard = {
  type: typeof ADD_NEW_BOARD;
  payload: NewBoards;
};

export const DEL_NAV = "DEL_NAV";
type delNav = {
  type: typeof DEL_NAV;
  payload: any;
};

export const MOVE_LIST = "MOVE_LIST";
type MovedList = {
  type: typeof MOVE_LIST;
  payload: BOARD;
};

export const MOVE_CARD = "MOVE_CARD";
type MovedCard = {
  type: typeof MOVE_CARD;
  payload: ListsById;
};

export const ADD_LIST = "ADD_LIST";
type AddList = {
  type: typeof ADD_LIST;
  payload: any;
};

export const ADD_CARD = "ADD_CARD";
type AddCard = {
  type: typeof ADD_CARD;
  payload: Add;
};

export const DELETE_LIST = "DELETE_LIST";
type DeleteList = {
  type: typeof DELETE_LIST;
  payload: DelList;
};

export const CHANGE_LIST_TITLE = "CHANGE_LIST_TITLE";
type ChangeListTitle = {
  type: typeof CHANGE_LIST_TITLE;
  payload: ListsById;
};

export const DELETE_CARD = "DELETE_CARD";
type DeleteCard = {
  type: typeof DELETE_CARD;
  payload: Del;
};

export const CHANGE_CARD_TEXT = "CHANGE_CARD_TEXT";
type ChangeCardText = {
  type: typeof CHANGE_CARD_TEXT;
  payload: CardsById;
};

export type Board =
  | AddNewBoard
  | FetchBoardData
  | delNav
  | MovedList
  | AddList
  | AddCard
  | DeleteList
  | ChangeListTitle
  | DeleteCard
  | ChangeCardText
  | MovedCard;
