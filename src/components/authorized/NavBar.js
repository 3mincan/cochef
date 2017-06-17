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

      <a className="navbar-brand" href="#">Hello World</a>
          <form className="navbar-form">
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
              <img className="navbar-pp img-circle" id="ppnimage" src={this.props.ppurl} alt={this.props.firstName + this.props.lastName}/>
          </li>
            <li>
                <a href="/FriendList"><i className="glyphicon glyphicon-user" title="Friends & Requests"></i></a>
            </li>
            <li>
                <a href="/Messages"><i className="glyphicon glyphicon-envelope" title="Messages"></i></a>
            </li>
            <li>
                <a href="#"><i className="glyphicon glyphicon-globe" title="Online People"></i></a>
            </li>
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i className="glyphicon glyphicon-menu-down" title="Menu"></i> <span className="caret"></span></a>
          <ul className="dropdown-menu" role="menu">
            <li><a href="#">Settings</a></li>
            <li><a href="#">Logout</a></li>
          </ul>
        </li>
      </ul>


    </div>
  </div>
</nav>



        );
    }
}
