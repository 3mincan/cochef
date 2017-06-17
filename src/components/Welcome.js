import React from 'react';
import NavBarReg from './NavBarReg';
import { hashHistory } from 'react-router';
// import Db from './js/db.js'

import axios from 'axios';

export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email:'',
            password:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    handleChange (e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submit(e) {
        e.preventDefault();
        const {firstname, lastname, email, password} = this.state;
        axios.post('/createNewUser', { firstname, lastname, email, password })
        .then(() => {
            browserHistory.push('/profile')
            console.log('finishing up submit')
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <div>
                <NavBarReg handleLogin={this.handleLogin} submit={this.handleLoginSubmit} />
                <Splash />
                <RegisterForm handleChange={this.handleChange} submit={this.submit} />
                {this.props.children}
            </div>
        );
    }
}

function Splash() {
    return (
        <div className="text-center col-md-3 col-md-offset-3">
            <title>Welcome to the Internet</title>
            <h1>Welcome to the Internet</h1>
            <img src="/public/logo/logo.png"/>
        </div>
    );
}

function RegisterForm (props) {
    return (
        <div className="col-xs-3 jumbotron vertical-center">
        <div className="panel panel-primary text-center ">
          <div className="panel-heading">Create your Account</div>
              <p className="help-block"></p>
          <div className="panel-body">
              <form className="form-horizontal" method="POST">
                  <div className="control-group">
                      <div className="controls">
                          <input type="text" onChange={props.handleChange} name="firstname" placeholder="First name" className="input-xlarge"/>
                          <p className="help-block"></p>
                      </div>
                  </div>
                  <div className="control-group">
                      <div className="controls">
                          <input type="text" id="lastname" onChange={props.handleChange} name="lastname" placeholder="Last name" className="input-xlarge"/>
                          <p className="help-block"></p>
                      </div>
                  </div>

                  <div className="control-group">
                      <div className="controls">
                          <input type="email" id="email" onChange={props.handleChange} name="email" placeholder="E-Mail" className="input-xlarge"/>
                          <p className="help-block"></p>
                      </div>
                  </div>

                  <div className="control-group">
                      <div className="controls">
                          <input type="password" id="password" onChange={props.handleChange} name="password" placeholder="Password" className="input-xlarge"/>
                          <p className="help-block"></p>
                      </div>
                  </div>

                  <div className="control-group">
                      <div className="controls">
                          <button className="btn btn-primary" onClick={props.submit}>Register</button>
                      </div>
                  </div>
              </form>
          </div>
    </div>
</div>

    )
}
