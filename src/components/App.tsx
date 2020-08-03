import React from "react";
import Board from "./Board";
import { HashRouter as Router, Route } from "react-router-dom";
import styled from "styled-components";

const App = () => {
  return (
    <Container>
      <Header>Board</Header>
      <Router>
        <Route path='/' exact component={Board} />
        <Route path='/:boardID' component={Board} />
      </Router>
    </Container>
  );
};

export default App;

const Container = styled.div`
  background: #50c9c3;
  background: -webkit-linear-gradient(to right, #96deda, #50c9c3);
  background: linear-gradient(to right, #96deda, #50c9c3);
  height: 100vh;
`;

const Header = styled.div`
  background: #00c6ff;
  background: -webkit-linear-gradient(to right, #0072ff, #00c6ff);
  background: linear-gradient(to right, #0072ff, #00c6ff);
  color: white;
  padding: 5px 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  text-align: center;
  font-size: 40px;
  font-weight: 200;
  text-align: left;
  font-family: sans-serif;
`;
