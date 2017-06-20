import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import Welcome from './components/Welcome';
import Contact from './components/Contact';
import Profile from './components/authorized/Profile';


const router = (
    <Router history={browserHistory}>
        <Route path="/contact" component={Contact}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/" component={Welcome}/>
    </Router>
);

// function HelloWorld() {
//     return (
//         <h1>Hello world!</h1>
//     )
// }

ReactDOM.render(
    router,
    document.getElementById('main')
);
