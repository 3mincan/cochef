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
                        <a className="navbar-brand" href="#">Co-Chef</a>
                    </div>
                    <center>
                        <ul id="signInDropdown" className="nav navbar-nav navbar-right">
                        <button className="btn btn-primary navbar-btn" data-toggle="modal" data-target="#myModal">Login / Register</button>
                        <div className="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
                            aria-hidden="true">
                            <div className="modal-dialog modal-lg">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="row">
                                            <div className="col-md-8">
                                                <ul className="nav nav-tabs">
                                                    <li className="active"><a href="#Login" data-toggle="tab"><h6>Login</h6></a></li>
                                                    <li><a href="#Registration" data-toggle="tab"><h6>Register</h6></a></li>
                                                </ul>
                                                <div className="tab-content">
                                                    <div className="tab-pane active" id="Login">
                                                        <form role="form" className="form-horizontal">
                                                        <div className="form-group">
                                                            <label for="email" className="col-sm-2 control-label">E-mail</label>
                                                            <div className="col-sm-10">
                                                                <input type="email" className="form-control" id="email" placeholder="E-mail" />
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label for="exampleInputPassword1" className="col-sm-2 control-label">Password</label>
                                                            <div className="col-sm-10">
                                                                <input type="email" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-sm-2">
                                                            </div>
                                                            <div className="col-sm-10">
                                                                <button type="submit" className="btn btn-primary btn-sm">Submit</button>
                                                                <a href="javascript:;">Forgot your password?</a>
                                                            </div>
                                                        </div>
                                                        </form>
                                                    </div>
                                                    <div className="tab-pane" id="Registration">
                                                        <form role="form" className="form-horizontal">
                                                        <div className="form-group">
                                                            <label for="firstname" className="col-sm-2 control-label">First Name</label>
                                                            <div className="col-sm-10">
                                                                <input type="text" className="form-control" placeholder="First Name" />
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label for="lastname" className="col-sm-2 control-label">Last Name</label>
                                                            <div className="col-sm-10">
                                                                <input type="text" className="form-control" placeholder="Last Name" />
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label for="email" className="col-sm-2 control-label">E-mail</label>
                                                            <div className="col-sm-10">
                                                                <input type="email" className="form-control" id="email" placeholder="E-mail" />
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label for="password" className="col-sm-2 control-label">Password</label>
                                                            <div className="col-sm-10">
                                                                <input type="password" className="form-control" id="password" placeholder="Password" />
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-sm-2">
                                                            </div>
                                                            <div className="col-sm-10">
                                                                <button type="button" className="btn btn-primary btn-sm">Save & Continue</button>
                                                                <button type="button" className="btn btn-default btn-sm">Cancel</button>
                                                            </div>
                                                        </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="row text-center sign-with">
                                                    <div className="col-md-12">
                                                        <h5>Sign in with</h5>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="btn-group btn-group-justified">
                                                            <a href="#" className="btn btn-primary">Facebook</a>
                                                            <a href="#" className="btn btn-danger">Google</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        </ul>
                    </center>
                </div>
            </div>
        );
    }
}
