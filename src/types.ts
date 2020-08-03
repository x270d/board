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

export type ListId = {
  id: string;
  title: string;
  cards: string[];
};

export type DelList = {
  listId: string;
  cards: string[];
  newLists: string[];
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
  board: Lists;
  listsById: ListsById;
  cardsById: CardsById;
};

export type MoveList = {
  oldCardIndex: number;
  newCardIndex: number;
};

export type MoveCard = {
  sourceListId: string;
  destListId: string;
};
