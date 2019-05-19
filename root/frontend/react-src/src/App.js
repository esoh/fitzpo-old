import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './App.css';
import Register from './auth/Register';
import Login from './auth/Login';
import Home from './home/Home';

function App() {
    return (
        <Router>
            <Route path='/' exact component={Home} />
            <Route path='/signup' component={Register} />
            <Route path='/login' component={Login} />
        </Router>
    );
}

export default App;
