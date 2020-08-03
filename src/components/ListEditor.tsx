import React, { useRef, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import styled from "styled-components";

type IProps = {
  onClickOutside: () => void;
  title: string;
  handleChangeTitle: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  deleteList?: any;
  saveList: () => void;
};

const ListEditor = ({
  onClickOutside,
  title,
  handleChangeTitle,
  deleteList,
  saveList,
}: IProps) => {
  const ref = useRef(null);

  const onEnter = (e: React.KeyboardEvent) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      saveList();
    }
  };

  useEffect(() => {
    const handleClick = (e: any) => {
      const node: any = ref.current;
      if (node.contains(e.target)) {
        return;
      }
      onClickOutside();
    };
    document.addEventListener("click", handleClick, false);
    return () => document.removeEventListener("click", handleClick, false);
  });

  return (
    <Container ref={ref}>
      <TextArea
        autoFocus
        placeholder='Enter list title...'
        value={title}
        onChange={handleChangeTitle}
        onKeyDown={onEnter}
        style={{ width: deleteList ? 220 : 245 }}
      />
      {deleteList && (
        <i
          className='fa fa-trash'
          style={{ marginLeft: "10px", padding: "4px" }}
          onClick={deleteList}
          aria-hidden='true'
        />
      )}
    </Container>
  );
};

export default ListEditor;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const TextArea = styled(TextareaAutosize)`
  margin: 6px 0 5px 6px;
  border-radius: 3px;
  border: none;
  resize: none;
  outline: none;
  font-size: 15px;
  padding: 5px;
  &:focus {
    box-shadow: inset 0 0 0 2px #0079bf;
  }
`;
