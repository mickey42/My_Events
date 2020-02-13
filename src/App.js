import React, { Component } from 'reactn';
import {Navbar, NavItem} from "react-bootstrap";
import {Link} from "react-router-dom";
import avatar from './avatar.png';
import Routes from './Routes';
import Nav from './pages/Navbar';

export default class App extends Component {
  render() {
    return(
      <div className="App">
        <Nav></Nav>
      </div>
  );
  }
}
