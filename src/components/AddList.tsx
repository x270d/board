import React, { useState } from "react";
import { addList } from "../actions/actions";
import { useDispatch } from "react-redux";
import ListEditor from "./ListEditor";
import EditButtons from "./EditButtons";
import styled from "styled-components";

type IProps = {
  toggleAddingList: () => void;
  boardId: string;
  boardTitle: string;
};

const AddList = ({ toggleAddingList, boardId, boardTitle }: IProps) => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const handleChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setTitle(e.target.value);

  const createList = () => {
    toggleAddingList();
    if (title && title.trim()) {
      dispatch(addList(title, boardId, boardTitle));
    }
  };

  return (
    <List>
      <ListEditor
        title={title}
        handleChangeTitle={handleChangeTitle}
        onClickOutside={toggleAddingList}
        saveList={createList}
      />

      <EditButtons
        handleSave={createList}
        saveLabel='Add list'
        handleCancel={toggleAddingList}
      />
    </List>
  );
};

export default AddList;

const List = styled.div`
  background: #c0c0c0;
  padding: 2px 2px;
`;
