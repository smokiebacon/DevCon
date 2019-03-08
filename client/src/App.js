import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './Store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions/authActions';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Landing from './components/Layout/Landing';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';

import './App.css';

//check for Token
if(localStorage.jwtToken) {
  //set auth Token header auth
  setAuthToken(localStorage.token);
  //decode token and get user info and expiration
  const decoded = jwt_decode(localStorage.jwtToken);
  //Sets current user and isAuthenticated
  store.dispatch(setCurrentUser(decoded))


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
           </div>
         <Footer />
       </div>
      </Router>
    </Provider>
    );
  }
}

export default App;
