import React, {Component} from "reactn";
import {Link} from 'react-router-dom';
import avatar from '../avatar.png';
import Routes from '../Routes';
import './navbar.css';

export default class Nav extends Component {
    render() {
        return(
          <div className="App">
              <div className='nav'>
            <Link className="home" to="/">Home</Link>
            <Link className='facebook' to="/profile">
                  <img className='img' src={avatar} width="30" height="30" alt="Profile avatar"/>
              </Link>
              </div>
              <Routes/>
          </div>
      );
      }
}