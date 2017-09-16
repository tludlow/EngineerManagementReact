/*
  Import Dependencies
*/
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute} from 'react-router'
import 'babel-polyfill';

/* Import CSS */
//eslint-disable-next-line
import css from './styles/main.scss';

/*
  Import Components
*/
import App from './components/App';
import ErrorPage from "./components/error/ErrorPage";

/*
  Import Views
*/
import Home from "./views/Home";
import AuthView from "./views/AuthView";
import WriteStorie from "./views/WriteStorie";
import StaffDashboard from "./views/StaffDashboard";
import ProfileView from "./views/ProfileView";
import PostView from "./views/PostView";

/* Import our data store */
import store, {history} from './store';

/*
  Error Logging
*/

// import Raven from 'raven-js'; import { sentry_url } from './data/config';
// if(window) {   Raven.config(sentry_url).install(); }

/*
  Rendering
  This is where we hook up the Store with our actual component and the router
*/
render(
  <Provider store={store}>
    { /* Tell the Router to use our enhanced history */ }
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/auth" component={AuthView}></Route>
        <Route path="/error" component={ErrorPage}></Route>
        <Route path="/newstory" component={WriteStorie}></Route>
        <Route path="/staffdashboard" component={StaffDashboard}></Route>
        <Route path="/profile/:profileName" component={ProfileView}></Route>
        <Route path="/post/:postId" component={PostView}></Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);

/*
render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={PhotoGrid} />
        <Route path="/view/:postId" component={Single}></Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);

*/
