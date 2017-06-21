import React from 'react';
import NavBarReg from './authorized/NavBarReg';
import ContactForm from './ContactForm';
import Footer from './Footer';
import { hashHistory } from 'react-router';
// import Db from './js/db.js'

import axios from 'axios';

export default class Welcome extends React.Component {

    render() {
        return (
            <div>
                <ContactForm />
                <Footer />
            </div>
        );
    }
}
