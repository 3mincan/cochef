import React from 'react';
import axios from 'axios';
import {Link} from 'react-router';
// import { Router, Route, Switch } from 'react-router';

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
    }

    handleLogoutSubmit(e) {
    e.preventDefault();
    axios.get('/userLogout').then((res) => {
        location.href='/';
    });
    }

    render() {
        return (

<nav className="navbar navbar-inverse">
  <div className="container-fluid col-sm-offset-1">

    <div className="navbar-header col-sm-4 navbar-left">

      <a className="navbar-brand" href="#">Co-Chef</a>
          <form className="navbar-form text-center">
              <div className="input-group input-group-sm">
                  <input type="text" className="form-control" placeholder="Search" name="srch-term" id="srch-term"/>
                  <div className="input-group-btn">
                      <button className="btn btn-default" type="submit"><i className="glyphicon glyphicon-search"></i></button>
                  </div>
              </div>
          </form>
    </div>


    <div className="collapse navbar-collapse">
      <ul className="nav navbar-nav navbar-right col-sm-4">
            <li>
                <a href="/addrecipe"><i className="glyphicon glyphicon-plus" title="Add Recipe"></i></a>
            </li>
            <li>
                <a href="/profile"><i className="glyphicon glyphicon-user" title="My Profile"></i></a>
            </li>
            <li>
                <a href="/logout"><i className="glyphicon glyphicon-log-out" title="Log Out"></i></a>
            </li>
      </ul>


    </div>
  </div>
</nav>



        );
    }
}
