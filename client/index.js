import App from './components/App';
import Home from './components/Home';
import UserCreator from './components/UserCreator';
import NewGame from './components/NewGame';

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

require('es6-promise').polyfill();
require('isomorphic-fetch');

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="usercreator" component={UserCreator} />
      <Route path="newgame" component={NewGame} />
    </Route>
  </Router>
  , document.getElementById('root'));
