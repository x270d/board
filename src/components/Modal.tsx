import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { createPortal } from "react-dom";
import TextareaAutosize from "react-textarea-autosize";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { changeCardText, delCard } from "../actions/actions";

type IProps = {
  id: number;
  listId: string;
  title: string;
  desc: string;
  activator: any;
};

const Modal = ({ id, listId, title, desc, activator }: IProps) => {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [headTitle, setHeadTitle] = useState(title);
  const [description, setDescription] = useState(desc);
  const dispatch = useDispatch();
  const handleModal = () => {
    setShow(false);
  };

  const editTask = () => {
    const text = headTitle;
    const desc = description;
    dispatch(changeCardText(id, text, date, desc));
    setShow(false);
  };

  const deleteCard = () => {
    dispatch(delCard(id, listId));
  };

  const content = (
    <Overlay onClick={handleModal}>
      <ModalBlock>
        <ModalBody onClick={(e) => e.stopPropagation()}>
          <IconClose>
            <i
              className='fa fa-times fa-lg'
              onClick={handleModal}
              aria-hidden='true'
            />
          </IconClose>
          <Container>
            <Block>
              <H4>Title:</H4>
              <TextArea
                placeholder='Edit title'
                value={headTitle}
                name='headTitle'
                onChange={(e) => setHeadTitle(e.target.value)}
              />
            </Block>
            <Block>
              <H4>Description:</H4>
              <TextArea
                placeholder='Edit description'
                onChange={(e) => setDescription(e.target.value)}
                name='description'
                value={description}
              />
            </Block>
            <Block>
              <H4>Date of completion</H4>
              <DatePicker
                selected={date}
                dateFormat='dd/MM/yyyy'
                onChange={(data: Date) => setDate(data)}
              />
            </Block>

            <ButtonsGroup>
              <Button primary onClick={editTask}>
                Save
              </Button>
              <Button danger onClick={deleteCard}>
                Delete
              </Button>
            </ButtonsGroup>
          </Container>
        </ModalBody>
      </ModalBlock>
    </Overlay>
  );

  return (
    <>
      {activator({ setShow })}
      {createPortal(
        <CSSTransition
          in={show}
          timeout={120}
          classNames='modal-transition'
          unmountOnExit
        >
          {() => <Box>{content}</Box>}
        </CSSTransition>,
        document.body
      )}
    </>
  );
};

export default Modal;

const H4 = styled.h4`
  padding-bottom: 10px;
`;

const Block = styled.div`
  padding: 10px;
`;

const Container = styled.div`
  max-width: 100%;
`;

const IconClose = styled.div`
  float: right;
  cursor: pointer;
`;

type ButtonProps = {
  primary?: boolean;
  danger?: boolean;
};

const Button = styled.button<ButtonProps>`
  ${(props) => {
    if (props.primary) {
      return `background: #007bff;`;
    } else if (props.danger) {
      return `background: #dc3545;`;
    }
  }}
  color: #fff;
  cursor: pointer;
  font-size: 1em;
  margin: 1em;
  padding: 8px 15px;
  border: none;
  border-radius: 3px;
`;

const ButtonsGroup = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 98;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 7;
`;

const ModalBlock = styled.div`
  position: relative;
  z-index: 99;
  width: 100%;
  max-width: 20rem;
  max-height: 100%;
  margin: 20px auto;
`;

const ModalBody = styled.div`
  margin: 20px 0;
  padding: 15px;
  border-radius: 4px;
  background-color: white;
  z-index: 999;
  box-sizing: border-box;
`;

const TextArea = styled(TextareaAutosize)`
  max-width: 255px;
  width: 100%;
  border: none;
  resize: none;
  outline: none;
  font-size: 15px;
  border: 1px solid rgba(0, 0, 0, 0.4);
  padding: 5px;
  border-radius: 5px;
`;

const Box = styled.div`
transition: opacity 0.3s;
  &.modal-transition-enter ${Overlay} {
    opacity: 0;
  }

  &.modal-transition-active ${Overlay}{
    opacity: 1;
    transition: opacity 200ms;
  }

  &.modal-transition-exit ${Overlay}{
    opacity: 1;
  }

  &.modal-transition-exit-active ${Overlay}{
    opacity: 0;
    transition: opacity 200ms;
  }

  &.modal-transition-enter ${ModalBlock} {
    opacity: 0;
    transform: scale(0.95) translateY(-30px);
  }
  &.modal-transition-enter-active ${ModalBlock}{
    opacity: 1;
    transform: translateX(0) translateY(0);
    transition: opacity 200ms, transform 200ms;
  }
  &.modal-transition-exit ${ModalBlock} {
    opacity: 1;
  }
  &.modal-transition-exit-active ${ModalBlock} {
    opacity: 0;
    transform: scale(0.95) translateY(-30px);
    transition: opacity 200ms, transform 200ms;
  }
}`;
