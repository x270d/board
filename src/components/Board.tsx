import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { moveList, moveCard, getFetchBoard } from "../actions/actions";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import List from "./List";
import AddList from "./AddList";
import { RootState } from "../reducers";
import styled from "styled-components";

type PropsMatch = {
  boardId: string;
};

const Board = ({ match }: RouteComponentProps<PropsMatch>) => {
  const [addingList, setAddingList] = useState(false);
  const dispatch = useDispatch();
  const boardId = match.params.boardId;
  const board = useSelector((state: RootState) => state.board[boardId]);
  useEffect(() => {
    dispatch(getFetchBoard());
  }, [dispatch]);

  const toggleAddingList = () => setAddingList(!addingList);

  const handleDragEnd = ({ source, destination, type }: DropResult) => {
    if (!destination) return;

    if (type === "COLUMN") {
      if (source.index !== destination.index) {
        const oldListIndex = source.index;
        const newListIndex = destination.index;
        dispatch(moveList(oldListIndex, newListIndex, boardId));
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

  if (!board) {
    return <div></div>;
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId='board' direction='horizontal' type='COLUMN'>
        {(provided, _snapshot) => (
          <Container ref={provided.innerRef} {...provided.droppableProps}>
            {board.lists
              ? board.lists.map((listId: string, index: number) => {
                  return (
                    <List
                      boardId={boardId}
                      listId={listId}
                      key={listId}
                      index={index}
                      boardTitle={board.title}
                    />
                  );
                })
              : ""}

            {provided.placeholder}

            <ListAdd>
              {addingList ? (
                <AddList
                  boardId={boardId.toString()}
                  boardTitle={board.title}
                  toggleAddingList={toggleAddingList}
                />
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
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
`;

const ListAdd = styled.div`
  width: 272px;
  margin: 10px;
  flex-shrink: 0;
`;
const AddListButton = styled.div`
  background-color: rgba(0, 0, 0, 0.12);
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
