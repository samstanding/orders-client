import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import OrderTracker from './components/OrderTracker/OrderTracker';
import OrderForm from './components/OrderForm/OrderForm';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
        <Redirect exact from="/" to="/home" />
        <Route 
          path="/home"
          component={OrderForm}
        />
        <Route
          path="/admin"
          component={OrderTracker}
        />
      </Switch>
      </Router>
    );
  }
}

export default App;
