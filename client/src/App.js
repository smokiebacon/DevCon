import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Landing from './components/Layout/Landing';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';

import './App.css';

class App extends Component {
  render() {
    return (
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
    );
  }
}

export default App;
