import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import axios from 'axios';
import Welcome from './components/Welcome';
import Filter from './components/Filter';
import Contact from './components/Contact';
import App from './components/authorized/App';
import Profile from './components/authorized/Profile';
import Recipe from './components/Recipe';
import NotFound from './components/NotFound';


const LoggedOutRouter = (
    <Router history={browserHistory}>
        <Route path="/" component={Welcome}/>
        <Route path="/contact" component={Contact}/>
        <Route path="/recipe/:id" component={Recipe}/>
        <Route path='*' component={NotFound} />
    </Router>
)

const LoggedInRouter = (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="/search" component={Filter}/>
            <Route path="/profile" component={Profile}/>
            <Route path="/recipe/:id" component={Recipe}/>
            <Route path="/contact" component={Contact}/>
            <Route path='*' component={NotFound} />
        </Route>
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
