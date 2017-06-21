import React, {Component} from 'react';
import NavBarReg from './NavBarReg';
import ProfilePanel from './ProfilePanel';
import Footer from '../Footer';


export default class Profile extends Component {
    render () {
        return (
            <div>
                <ProfilePanel />
                <Footer />
            </div>
        )
    }
}
