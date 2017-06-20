import React from 'react';
import NavBarReg from './authorized/NavBarReg';
import Filter from './Filter';
import Footer from './Footer';
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
                <Filter />
                {this.props.children}
                <Footer />
            </div>
        );
    }
}
