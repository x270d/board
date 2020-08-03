import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import EditButtons from "./EditButtons";
import styled from "styled-components";

type IProps = {
  onSave: (newText: string) => void;
  onCancel: () => void;
};

const CardEditor = ({ onSave, onCancel }: IProps) => {
  const [newText, setNewText] = useState("");

  const onEnter = (e: React.KeyboardEvent) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      onSave(newText);
    }
  };
  return (
    <EditCard>
      <Card>
        <TextArea
          autoFocus
          placeholder='Enter card title'
          value={newText}
          onChange={(event) => setNewText(event.target.value)}
          onKeyDown={onEnter}
        />
      </Card>
      <EditButtons
        handleSave={() => onSave(newText)}
        saveLabel='Add card'
        handleCancel={onCancel}
      />
    </EditCard>
  );
};

export default CardEditor;

const TextArea = styled(TextareaAutosize)`
  max-width: 255px;
  width: 100%;
  border: none;
  resize: none;
  outline: none;
  font-size: 15px;
`;

const Card = styled.div`
  position: relative;
  cursor: pointer;
  background: white;
  margin: 5px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 0 1px 0 rgba(9, 45, 66, 0.25);
  font-size: 15px;
  overflow-wrap: break-word;
  min-height: 18px;
`;

const EditCard = styled.div`
  &${Card} {
    min-height: 50px;
    padding-left: 8px;
    padding-right: 15px;
  }
  &${Card}:hover {
    background: white;
  }
`;
