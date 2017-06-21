import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import Welcome from './components/Welcome';
import Contact from './components/Contact';
import Profile from './components/authorized/Profile';
import AddRecipe from './components/authorized/AddRecipe';


// const loggedOutRouter = (
//     <Router history={browserHistory}>
//         <Route path="/" component={Welcome}/>
//         <Route path="/contact" component={Contact}/>
//     </Router>
// )
//
// const loggedInRouter = (
//     <Router history={browserHistory}>
//         <Route path="/" component={Welcome}>
//             <Route path="/profile" component={Profile}/>
//             <Route path="/addrecipe" component={AddRecipe}/>
//             <Route path="/contact" component={Contact}/>
//         </Route>
//         <Route path="*" onEnter={(state, replace) => replace('/')} />
//     </Router>
// )

const router = (
    <Router history={browserHistory}>
        <Router history={browserHistory}>
            <Route path="/addrecipe" component={AddRecipe}/>
            <Route path="/contact" component={Contact}/>
            <Route path="/profile" component={Profile}/>
            <Route path="/" component={Welcome}/>
        </Router>
    </Router>
);

// let elem;
// if (location.pathname == '/welcome') {
//     elem = loggedOutRouter;
//     console.log('loggedOutRouter');
// } else {
//     elem = loggedInRouter;
//     console.log('loggedInRouter');
// }
// ReactDOM.render(elem, document.querySelector('main'));

ReactDOM.render(
    router,
    document.getElementById('main')
);
