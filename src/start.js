import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import axios from 'axios';
import Welcome from './components/Welcome';
import Contact from './components/Contact';
import Profile from './components/authorized/Profile';
import AddRecipe from './components/authorized/AddRecipe';

const LoggedOutRouter = (
    <Router history={browserHistory}>
        <Route path="/" component={Welcome}/>
        <Route path="/contact" component={Contact}/>
    </Router>
)

const LoggedInRouter = (
    <Router history={browserHistory}>
        <Route path="/" component={Profile}>
            <Route path="/profile" component={Profile}/>
            <Route path="/addrecipe" component={AddRecipe}/>
            <Route path="/contact" component={Contact}/>
        </Route>
        <Route path="*" onEnter={(state, replace) => replace('/')} />
    </Router>
)

axios.get('/login-status').then(function(res) {
    let elem;
    if (res.data.loggedIn) {
        elem = LoggedInRouter ;
    } else {
        elem = LoggedOutRouter;
    }
    ReactDOM.render(elem, document.querySelector('#main'))
});
