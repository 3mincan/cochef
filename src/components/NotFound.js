import React from 'react';
import axios from 'axios';
import {Link} from 'react-router';
import NavBarReg from './authorized/NavBarReg';

// import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router';

export default class NotFound extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <NavBarReg loggedIn={true} />
                <div className="row text-center">
                    <div className="col-md-12">
                        <div className="error-template">
                            <h1>404!</h1>
                            <h2>Not Found :(</h2>
                            <div className="alert alert-dismissible alert-danger">The page you were looking for cannot be found. Do you wanna watch a video about bangers and mash?</div>
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/2xN-H5QTYWs" frameborder="0" allowfullscreen></iframe>
                            <div className="error-actions">
                                <a href="/" className="btn btn-primary btn-lg"><span className="glyphicon glyphicon-home"></span> Take Me Home </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
