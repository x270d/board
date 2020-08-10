import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { addNewCard, delList, changeListTitle } from "../actions/actions";
import Card from "./Card";
import CardEditor from "./CardEditor";
import ListEditor from "./ListEditor";

import shortid from "shortid";
import { RootState } from "../reducers";
import styled from "styled-components";

type IProps = {
  listId: string;
  index: number;
  boardId: string;
  boardTitle: string;
};

const List = ({ listId, index, boardId, boardTitle }: IProps) => {
  const list: any = useSelector((state: RootState) => state.listsById[listId]);
  const [editingTitle, setEditingTitle] = useState(false);
  const [addingCard, setAddingCard] = useState(false);
  const [title, setTitle] = useState(list.title);

  const dispatch = useDispatch();
  const toggleAddingCard = () => setAddingCard(!addingCard);

  const addCard = (cardText: string) => {
    toggleAddingCard();

    const cardId = shortid.generate();
    const data = "";
    if (cardText && cardText.trim()) {
      dispatch(addNewCard(cardText, cardId, listId, data));
    }
  };

  const toggleEditingTitle = () => setEditingTitle(!editingTitle);

  const handleChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setTitle(e.target.value);

  const editListTitle = () => {
    toggleEditingTitle();

    dispatch(changeListTitle(listId, title));
  };

  const deleteList = () => {
    const cards = list.cards;
    dispatch(delList(listId, cards, boardId, boardTitle));
  };

  if (list === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided, snapshot) => (
        <ListContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
        >
          {editingTitle ? (
            <ListEditor
              title={title}
              handleChangeTitle={handleChangeTitle}
              saveList={editListTitle}
              onClickOutside={editListTitle}
              deleteList={deleteList}
            />
          ) : (
            <ListTitle onClick={toggleEditingTitle}>{list.title}</ListTitle>
          )}

          <Droppable droppableId={list.id}>
            {(provided, snapshot) => (
              <CardContainer
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {list.cards &&
                  list.cards.map((cardId: string, index: number) => (
                    <Card
                      key={cardId}
                      cardId={cardId}
                      index={index}
                      listId={list.id}
                    />
                  ))}

                {provided.placeholder}
                {addingCard ? (
                  <CardEditor onSave={addCard} onCancel={toggleAddingCard} />
                ) : (
                  <ToggleAddCard onClick={toggleAddingCard}>
                    <i className='fa fa-plus' aria-hidden='true' />
                    &nbsp; Add a card
                  </ToggleAddCard>
                )}
              </CardContainer>
            )}
          </Droppable>
        </ListContainer>
      )}
    </Draggable>
  );
};

export default List;

type Draggin = {
  isDragging?: boolean;
  isDraggingOver?: boolean;
};

const ListTitle = styled.div`
  cursor: pointer;
  padding: 10px;
  overflow-wrap: break-word;
  font-weight: bold;
`;

const ListContainer = styled.div<Draggin>`
  transition: background 0.5s ease;
  background: ${(props) => (props.isDragging ? "#00CC66" : "#eee")};
  ${ListTitle} {
    color: ${(props) => (props.isDragging ? "#fff" : "#333")};
  }
  flex-shrink: 0;
  width: 272px;
  height: fit-content;
  margin: 10px;
  margin-right: 0;

  border: 1px solid rgba(0, 0, 0, 0.12);
`;

const CardContainer = styled.div<Draggin>`
  padding: 5px 0;
  transition: background 0.5s ease;
  background: ${(props) => (props.isDraggingOver ? "#999" : "#fff")};
`;

const ToggleAddCard = styled.div`
  cursor: pointer;
  padding: 10px;
  color: #6b808c;
  display: flex;
  align-items: center;
  background-color: #fff;
  &:hover {
    background-color: rgba(9, 45, 66, 0.13);
    color: #17394d;
  }
`;
