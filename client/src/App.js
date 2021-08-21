import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

// components
import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Join />
        </Route>
        <Route path='/chat'>
          <Chat />
        </Route>
        <Redirect to='/' />
      </Switch>
    </Router>
  );
};

export default App;
