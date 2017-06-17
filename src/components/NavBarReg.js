import React from 'react';
import axios from 'axios';
import {Link} from 'react-router';
// import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router';

export default class NavBarReg extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 'email':'', 'password':'' };

        this.handleLoginSubmit=this.handleLoginSubmit.bind(this);
    }

    handleInput(e) {
    this.setState( {[e.target.name]: e.target.value} );
    }

    handleLoginSubmit(e) {
        console.log('handleLoginSubmit initiated');
        e.preventDefault();
        const userLoginInfo = {
            email: this.state.email,
            password: this.state.password
        }
        console.log('userloginInfo', userLoginInfo);
        axios.post('/login', userLoginInfo).then((result) => {
            console.log('login was successful', result.data);
            if (result.data.success) {
                location.replace('/profile');
                this.setState({ success: true })
            } else {
                this.setState({ error: 'Something went wrong.' });
            }
        }).catch((err) => {
            console.log(err);
            this.setState({ error: 'Something went wrong.' });
        })
    }

    render() {
        return (
            <div className="navbar navbar-inverse navbar-top">
                <div className="container">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">Hello World</a>
                    </div>
                    <center>
                        <div className="navbar-collapse collapse" id="navbar-main">
                            <form className="navbar-form navbar-right" role="search">
                                <div className="form-group">
                                    <input type="email" onChange={this.handleInput.bind(this)} className="form-control" name="email" placeholder="E-Mail Address"/>
                                </div>
                                <div className="form-group">
                                    <input type="password" onChange={this.handleInput.bind(this)} className="form-control" name="password" placeholder="Password"/>
                                </div>
                                <button type="submit" onClick={this.handleLoginSubmit} className="btn btn-default">Sign In</button>
                            </form>
                        </div>
                    </center>
                </div>
            </div>
        );
    }
}
