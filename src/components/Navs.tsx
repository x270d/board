import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFetchBoard, addNewBoard, delNav } from "../actions/actions";
import { RootState } from "../reducers";
import { NavLink, useHistory } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
import styled from "styled-components";

export default function Navs() {
  const [addShow, setAddShow] = useState(false);
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const boardOrder = useSelector((state: RootState) => state.boardOrder.order);
  const boards = useSelector((state: RootState) => state.board);
  const history = useHistory();
  useEffect(() => {
    dispatch(getFetchBoard());
  }, [dispatch]);

  const deleteNav = (id: string) => {
    dispatch(delNav(id, history));
  };

  const renderBoards = () => {
    return boardOrder.map((boardId: string) => {
      const board = boards[boardId];

      return (
        <StyledLink key={boardId} to={`/${board.id}`}>
          {board.title}
          {/* Если в boardOrder будет пустой массив firebase его удалит, 
          или нужна проверка на пустой state.boardOrder */}
          {board.id !== "board-1" && (
            <IconClose
              className='fa fa-times fa-lg'
              onClick={() => deleteNav(boardId)}
              aria-hidden='true'
            />
          )}
        </StyledLink>
      );
    });
  };

  const AddNav = () => {
    if (title && title.trim()) {
      dispatch(addNewBoard(title));
    }
    setAddShow(false);
  };

  if (!boardOrder) {
    return <div>Loading</div>;
  }

  return (
    <Container>
      {renderBoards()}{" "}
      <Add>
        {addShow ? (
          <InputContainer>
            <TextArea autoFocus onChange={(e) => setTitle(e.target.value)} />
            <Button onClick={AddNav}>add</Button>
          </InputContainer>
        ) : (
          <IconPlus
            className='fa fa-plus'
            onClick={() => setAddShow(true)}
            aria-hidden='true'
          />
        )}
      </Add>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const TextArea = styled(TextareaAutosize)`
  padding: 5px;
  margin-right: 5px;
  resize: none;
`;

const Button = styled.button`
  background: #00cc00;
  color: #fff;
  padding: 5px;
  border: none;
  border-radius: 5px;
`;

const IconPlus = styled.i`
  padding: 10px;
`;

const IconClose = styled.i`
  margin-left: 15px;
`;

const InputContainer = styled.div`
  display: flex;
  padding: 5px;
  align-items: center;
`;

const Add = styled.div`
  background-color: #fff;
  display: inline-block;
  padding: 0px 10px;
  border: 1px solid #ddd;
  cursor: pointer;
`;

const activeClassName = "nav-item-active";

export const StyledLink = styled(NavLink).attrs({ activeClassName })`
  font-family: "Roboto", sans-serif;
  background-color: #fff;
  display: inline-block;
  padding: 10px 25px;
  color: #bbb;
  border-bottom: 1px solid #ddd;
  text-decoration: none;
  &.${activeClassName} {
    background-color: #fff;
    color: #555;
    border: 1px solid #ddd;
    border-top: 2px solid green;
    border-bottom: 1px solid #fff;
    cursor: default;
  }
  &:hover {
    background-color: #e8f3ee;
  }
`;
