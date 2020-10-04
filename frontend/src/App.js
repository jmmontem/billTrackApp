import React from 'react';
import './App.css';

import Home from "./Paths/Home"
import Category from "./Paths/Category"
import Register from "./Paths/Register"

import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';

function App() {
  return (

    <div className="App">

      <Router>
        <Switch>

            <Route path="/" exact={true} component={Home}/>
            <Route path="/categories" exact={true} component={Category}/>
            <Route path="/register" exact={true} component={Register}/>

        </Switch>
      </Router>

    </div>
  );
}

export default App;
