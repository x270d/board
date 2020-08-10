// Types
export type Idx = {
  id: string;
};

export type Lists = {
  lists: string[];
};

export type Board = {
  board: Lists;
};

type BItems = {
  id: string;
  title: string;
  lists: string[];
};

export type BOARD = {
  [elemName: string]: BItems;
};

export type BoardsOrder = {
  order: string[];
};

export type NewBoards = {
  newOrder: BoardsOrder;
  newBoard: BOARD;
};

export type ListId = {
  id: string;
  title: string;
  cards: string[];
};

export type DelList = {
  listId: string;
  cards: string[];
  newLists: BOARD;
  restOfLists: ListsById;
};

export type ListsById = {
  [elemName: string]: ListId;
};

export type Card = {
  text?: string;
  id?: string;
  data?: any;
};

export type CardsById = {
  [elemName: string]: Card;
};

export type Add = {
  newLists: CardsById;
  newCard: CardsById;
};

export type Del = {
  newCards: CardsById;
  restOfCards: CardsById;
};

export type State = {
  board: BOARD;
  listsById: ListsById;
  cardsById: CardsById;
  boardOrder: BoardsOrder;
};

export type MoveList = {
  oldCardIndex: number;
  newCardIndex: number;
  boardId?: string;
};

export type MoveCard = {
  sourceListId: string;
  destListId: string;
};
