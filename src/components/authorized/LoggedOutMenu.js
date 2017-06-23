import React from 'react';
import axios from 'axios';
import {Link} from 'react-router';
// import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router';

export default class LoggedOutMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = { firstname:'', lastname:'', email:'', password:'' };
        this.handleLoginSubmit=this.handleLoginSubmit.bind(this);
        this.handleInput=this.handleInput.bind(this);
        this.registerSubmit=this.registerSubmit.bind(this);
    }

    handleInput(e) {
        // console.log(e.target.value);
        this.setState( {[e.target.name]: e.target.value} );
    }

    handleLoginSubmit(e) {
        // console.log('handleLoginSubmit initiated');
        e.preventDefault();
        const userLoginInfo = {
            email: this.state.email,
            password: this.state.password
        }
        // console.log('userloginInfo', userLoginInfo);
        axios.post('/login', userLoginInfo).then((result) => {
            // console.log('login was successful', result.data);
            if (result.data.success) {
                location.replace('/profile');
                this.setState({ success: true })
            } else {
                this.setState({ error: 'Something went wrong.' });
            }
        }).catch((err) => {
            // console.log(err);
            this.setState({ error: 'Something went wrong.' });
        })
        }

        registerSubmit(e) {
            e.preventDefault();
            const {firstname, lastname, email, password} = this.state;
            // console.log('userloginInfo', {firstname, lastname, email, password});
            axios.post('/createNewUser', { firstname, lastname, email, password })
            .then(() => {
                location.replace('/profile')
                // console.log('finishing up submit')
            }).catch((error) => {
                // console.log(error);
            });
        }

    render() {
        return (
            <ul id="signInDropdown" className="nav navbar-nav navbar-right col-sm-4">
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
                                <div className="col-md-8 col-md-offset-2">
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
                                                    <input type="email" onChange={this.handleInput} className="form-control" id="email" name="email" placeholder="E-mail" />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label for="exampleInputPassword1" className="col-sm-2 control-label">Password</label>
                                                <div className="col-sm-10">
                                                    <input type="password" onChange={this.handleInput} className="form-control" name="password" id="exampleInputPassword1" placeholder="Password" />
                                                </div>
                                            </div>
                                            <div className="row">

                                                <div className="col-sm-10">
                                                    <button type="submit" onClick={this.handleLoginSubmit} className="btn btn-primary btn-sm">Submit</button>
                                                </div>
                                            </div>
                                            </form>
                                        </div>
                                        <div className="tab-pane" id="Registration">
                                            <form role="form" className="form-horizontal">
                                            <div className="form-group">
                                                <label for="firstname" className="col-sm-2 control-label">First Name</label>
                                                <div className="col-sm-10">
                                                    <input type="text" name="firstname" onChange={this.handleInput} className="form-control" placeholder="First Name" />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label for="lastname" className="col-sm-2 control-label">Last Name</label>
                                                <div className="col-sm-10">
                                                    <input type="text" name="lastname" onChange={this.handleInput} className="form-control" placeholder="Last Name" />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label for="email" className="col-sm-2 control-label">E-mail</label>
                                                <div className="col-sm-10">
                                                    <input type="email" name="email" onChange={this.handleInput} className="form-control" id="email" placeholder="E-mail" />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label for="password" className="col-sm-2 control-label">Password</label>
                                                <div className="col-sm-10">
                                                    <input type="password" name="password" onChange={this.handleInput} className="form-control" id="password" placeholder="Password" />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-2">
                                                </div>
                                                <div className="col-sm-10">
                                                    <button type="button" onClick={this.registerSubmit} className="btn btn-primary btn-sm">Save & Continue</button>
                                                    <button type="button" className="btn btn-default btn-sm">Cancel</button>
                                                </div>
                                            </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </ul>
        );
    }
}
