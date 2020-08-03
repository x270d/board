import React from "react";
import styled from "styled-components";

type IProps = {
  handleSave: () => void;
  saveLabel: string;
  handleCancel: () => void;
};

const EditButtons = ({ handleSave, saveLabel, handleCancel }: IProps) => (
  <EditedButtons>
    <EditButton onClick={handleSave} success>
      {saveLabel}
    </EditButton>
    <EditButton danger onClick={handleCancel}>
      <i className='fa fa-times' aria-hidden='true' /> Cancel
    </EditButton>
  </EditedButtons>
);

export default EditButtons;

type ButtonProps = {
  success?: boolean;
  danger?: boolean;
};

const EditedButtons = styled.div`
  display: flex;
  justify-content: space-around;
`;
const EditButton = styled.div<ButtonProps>`
  ${(props) => {
    if (props.success) {
      return `background: #28a745;`;
    } else if (props.danger) {
      return `background: #dc3545;`;
    }
  }}
  cursor: pointer;
  margin: 0 5px 10px;
  padding: 8px 15px;
  border-radius: 5px;
  color: white;
  font-weight: 700;
  outline: none;
  &:hover {
    opacity: 0.7;
  }
`;
