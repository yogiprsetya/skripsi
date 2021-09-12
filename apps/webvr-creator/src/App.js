import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from 'utils/setAuthToken';

import { setCurrentUser, logoutUser } from 'store/actions/authActions';
import { Provider } from 'react-redux';
import store from './store';

import Register from 'pages/Register';
import Login from 'pages/Login';
import PrivateRoute from 'utils/privateRoute';
import Dashboard from 'pages/Dashboard';
import CreateProject from 'pages/CreateProject';
import ExploreProject from 'pages/ExploreProject';
import RoomTourEditor from 'pages/RoomTourEditor';

if (localStorage.getItem('@webvrToken')) {
  const token = localStorage.getItem('@webvrToken');
  setAuthToken(token);

  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = './login';
  }
}

class App extends React.Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />

          <Switch>
            <PrivateRoute exact path='/' component={Dashboard} />
            <PrivateRoute path='/create-project' component={CreateProject} />
            <PrivateRoute path='/explore' component={ExploreProject} />
            <PrivateRoute path='/room-editor/:tour/:roomIndex' component={RoomTourEditor} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
