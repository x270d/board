import React from "react";
import Board from "./Board";
import { Home } from "./Home";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import styled from "styled-components";
import Navs from "./Navs";

const App = () => {
  return (
    <Container>
      <Router>
        <Header>
          <Logo to='/'>Board</Logo>
        </Header>
        <Navs />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/:boardId' component={Board} />
        </Switch>
      </Router>
    </Container>
  );
};

export default App;

const Container = styled.div`
  background: #50c9c3;
  background: -webkit-linear-gradient(to right, #96deda, #50c9c3);
  background: linear-gradient(to right, #96deda, #50c9c3);
`;

const Logo = styled(Link)`
  text-decoration: none;
  color: #fff;
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
  text-decoration: none;
`;
