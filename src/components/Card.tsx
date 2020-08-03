import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Draggable } from "react-beautiful-dnd";

import Modal from "./Modal";
// import "../styles/Card.css";
import styled from "styled-components";
import { RootState } from "../reducers";

type IProps = {
  cardId: string;
  index: number;
  listId: string;
};

const Card = ({ cardId, index, listId }: IProps) => {
  const [hover, setHover] = useState(false);
  const card = useSelector((state: RootState) => state.cardsById[cardId]);

  const day_1 = new Date();
  const day_2 = card.data ? new Date(card.data) : "0";

  const compareDates = (day_one: any, day_two: any) => {
    return Math.ceil(
      ((day_one as number) - (day_two as number)) / (60 * 60 * 24 * 1000)
    );
  };

  const day = compareDates(day_2, day_1);

  const startHover = () => setHover(true);
  const endHover = () => setHover(false);

  const formatDate = (date: Date) => {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 101).toString().substring(1);
    const day = (date.getDate() + 100).toString().substring(1);
    return day + "/" + month + "/" + year;
  };

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onMouseEnter={startHover}
          onMouseLeave={endHover}
        >
          <CardWrap color={day <= 3 ? "#fb7a87" : "#fff"}>
            <Modal
              activator={({ setShow }: any) => (
                <Title onClick={() => setShow(true)}>
                  {card.text}
                  {hover && (
                    <IconSee>
                      <i className='fa fa-pencil-square-o' aria-hidden='true' />
                    </IconSee>
                  )}
                </Title>
              )}
              title={card.text}
              desc={card.desc}
              id={card.id}
              listId={listId}
            />

            {card.data && (
              <Desc>
                Deadline: {formatDate(new Date(card.data))}
                <Clock className='fa fa-clock-o' aria-hidden='true' />
                left {day} {day === 1 ? "day" : "days"}
              </Desc>
            )}
          </CardWrap>
        </Container>
      )}
    </Draggable>
  );
};

export default Card;

const IconSee = styled.div`
  float: right;
`;

const Container = styled.div`
  position: relative;
  cursor: pointer;
  background: white;
  margin: 5px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 0 1px 0 rgba(9, 45, 66, 0.25);
  font-size: 15px;
  overflow-wrap: break-word;
  min-height: 18px;
  &:hover {
    background: #f5f6f7;
  }
`;

const Desc = styled.p`
  line-height: 22px;
`;

const Title = styled.div`
  padding-bottom: 15px;
  font-size: 18px;
  font-weight: 600;
`;

const Clock = styled.i`
  padding: 0 10px;
`;

const CardWrap = styled.div`
  padding: 8px;
  borderradius: 3px;
  background: ${(props) => props.color};
`;
