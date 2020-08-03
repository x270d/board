import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { moveList, moveCard, getFetchBoard } from "../actions/actions";
import { useSelector, useDispatch } from "react-redux";

import List from "./List";
import AddList from "./AddList";
import { RootState } from "../reducers";
import styled from "styled-components";

const Board = (props: any) => {
  const [addingList, setAddingListe] = useState(false);
  const dispatch = useDispatch();
  const board = useSelector((state: RootState) => state.board.lists);
  console.log(props.match);
  useEffect(() => {
    dispatch(getFetchBoard());
  }, [dispatch]);

  const toggleAddingList = () => setAddingListe(!addingList);

  const handleDragEnd = ({ source, destination, type }: DropResult) => {
    if (!destination) return;

    if (type === "COLUMN") {
      if (source.index !== destination.index) {
        const oldListIndex = source.index;
        const newListIndex = destination.index;
        dispatch(moveList(oldListIndex, newListIndex));
      }
      return;
    }

    if (
      source.index !== destination.index ||
      source.droppableId !== destination.droppableId
    ) {
      const obj = {
        sourceListId: source.droppableId,
        destListId: destination.droppableId,
        oldCardIndex: source.index,
        newCardIndex: destination.index,
      };
      dispatch(moveCard(obj));
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId='board' direction='horizontal' type='COLUMN'>
        {(provided, _snapshot) => (
          <Container ref={provided.innerRef}>
            {board.map((listId: string, index: number) => {
              return <List listId={listId} key={listId} index={index} />;
            })}

            {provided.placeholder}

            <ListAdd>
              {addingList ? (
                <AddList toggleAddingList={toggleAddingList} />
              ) : (
                <AddListButton onClick={toggleAddingList}>
                  <IconAdd>
                    <i className='fa fa-plus' aria-hidden='true' />
                  </IconAdd>{" "}
                  Add list
                </AddListButton>
              )}
            </ListAdd>
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;

const Container = styled.div`
  height: 90%;
  display: flex;
  overflow-x: auto;
`;

const ListAdd = styled.div`
  width: 272px;
  margin: 10px;
  flex-shrink: 0;
`;
const AddListButton = styled.div`
  background-color: rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  cursor: pointer;
  color: #fff;
  display: flex;
  align-items: center;
  min-height: 32px;
  padding: 5px 8px;
  transition: background-color 85ms ease-in, opacity 40ms ease-in,
    border-color 85ms ease-in;
  height: fit-content;
  &:hover {
    background-color: rgba(0, 0, 0, 0.24);
  }
`;

const IconAdd = styled.div`
  padding: 0 10px;
`;
