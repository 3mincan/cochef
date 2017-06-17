import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import Welcome from './components/Welcome';


const router = (
    <Router history={hashHistory}>
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
