import React from 'react';
import axios from 'axios';
import {Link} from 'react-router';
// import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router';

export default class LoggedInMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
              <ul className="nav navbar-nav navbar-right col-sm-4">
                    <li>
                        <Link to="/search"><i className="glyphicon glyphicon-search" title="Search"></i></Link>
                    </li>
                    <li>
                        <Link to="/profile"><i className="glyphicon glyphicon-user" title="My Profile"></i></Link>
                    </li>
                    <li>
                        <a href="/logout"><i className="glyphicon glyphicon-log-out" title="Log Out" onClick={this.handleClick}></i></a>
                    </li>
              </ul>
        );
    }
}
