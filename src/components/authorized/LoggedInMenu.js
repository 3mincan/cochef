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
                        <Link to="/addrecipe"><i className="glyphicon glyphicon-plus" title="Add Recipe"></i></Link>
                    </li>
                    <li>
                        <Link to="/profile"><i className="glyphicon glyphicon-user" title="My Profile"></i></Link>
                    </li>
                    <li>
                        <Link to="/logout"><i className="glyphicon glyphicon-log-out" title="Log Out" onClick={this.handleClick}></i></Link>
                    </li>
              </ul>
        );
    }
}
