import styled from "styled-components";
import { NewCategoryApp, SelectCategoryApp } from "./apps";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "jquery-ui-dist/jquery-ui.min.css";
import "semantic-ui-css/semantic.min.css";
import "./scss/index.scss";

const Nav = styled.nav`
  position: absolute;
  top: 0;
  bottom: 0;
`;

export default function App() {
  return (
    <Router>
      <div>
        <Nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/select-category">Select Category</Link>
            </li>
            <li>
              <Link to="/new-category">New Category</Link>
            </li>
          </ul>
        </Nav>

        <Switch>
          <Route path="/select-category">
            <SelectCategoryApp />
          </Route>
          <Route path="/new-category">
            <NewCategoryApp />
          </Route>
          <Route path="/" />
        </Switch>
      </div>
    </Router>
  );
}
