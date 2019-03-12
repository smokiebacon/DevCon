import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './Store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Landing from './components/Layout/Landing';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard/Main';
import CreateProfile from './components/CreateProfile/CreateProfile';

import PrivateRoute from './components/common/PrivateRoute'


import './App.css';

//keeps user logged in if they go to any page or on page refresh.
//check for Token
if(localStorage.jwtToken) {
  //set auth Token header auth
  setAuthToken(localStorage.token);
  //decode token and get user info and expiration
  const decoded = jwt_decode(localStorage.jwtToken);
  //Sets current user and isAuthenticated
  store.dispatch(setCurrentUser(decoded))

  //check for expired token. 
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //logout user
    store.dispatch(logoutUser());
    //clear profile
    store.dispatch(clearCurrentProfile());

    //redirect to login
    window.location.href = '/login'
  }
}

class App extends Component {
  render() {
    return (
    <Provider store = { store }>
      <Router>
        <div className="App">
          <Navbar />
           <Route exact path="/" component={ Landing } />
           <div className="container">
             <Route exact path="/login" component= { Login } />
             <Route exact path="/register" component= { Register } />
             <PrivateRoute exact path="/dashboard" component= { Dashboard } />
             <PrivateRoute exact path="/create-profile" component= { CreateProfile } />
           </div>
         <Footer />
       </div>
      </Router>
    </Provider>
    );
  }
}

export default App;
