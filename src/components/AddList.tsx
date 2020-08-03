import React, { useState } from "react";
import { addList } from "../actions/actions";
import { useDispatch } from "react-redux";
import ListEditor from "./ListEditor";
import EditButtons from "./EditButtons";
import styled from "styled-components";

type IProps = {
  toggleAddingList: () => void;
};

const AddList = ({ toggleAddingList }: IProps) => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const handleChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setTitle(e.target.value);

  const createList = () => {
    toggleAddingList();
    if (title && title.trim()) {
      dispatch(addList(title));
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
  border-radius: 5px;
  padding: 2px 2px;
`;
