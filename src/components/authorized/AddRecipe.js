import React from 'react';
import axios from 'axios';
import {Link} from 'react-router';
import NavBarReg from './NavBarReg';
import AddRecipeForm from './AddRecipeForm';

// import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router';

export default class AddRecipe extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
            <NavBarReg />
            <AddRecipeForm />
            </div>
        );
    }
}
