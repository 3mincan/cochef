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
                        <a href="/addrecipe"><i className="glyphicon glyphicon-plus" title="Add Recipe"></i></a>
                    </li>
                    <li>
                        <a href="/profile"><i className="glyphicon glyphicon-user" title="My Profile"></i></a>
                    </li>
                    <li>
                        <a href="/logout"><i className="glyphicon glyphicon-log-out" title="Log Out"></i></a>
                    </li>
              </ul>
        );
    }
}
