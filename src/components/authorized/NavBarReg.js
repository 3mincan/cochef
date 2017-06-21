import React from 'react';
import axios from 'axios';
import {Link} from 'react-router';
import LoggedInMenu from './LoggedInMenu';
import LoggedOutMenu from './LoggedOutMenu';

// import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router';

export default class NavBarReg extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="navbar navbar-inverse navbar-top">
                <div className="container">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="/">Co-Chef</a>
                    </div>
                    <center>
                            {this.props.loggedIn && <LoggedInMenu />}
                            {!this.props.loggedIn && <LoggedOutMenu />}
                    </center>
                </div>
            </div>
        );
    }
}
