import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './App.css';
import Signup from './auth/Signup';
import Login from './auth/Login';
import Home from './home/Home';

function App() {
    return (
        <Router>
            <Route path='/' exact component={Home} />
            <Route path='/signup' component={Signup} />
            <Route path='/login' component={Login} />
        </Router>
    );
}

export default App;
