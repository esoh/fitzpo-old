import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch, Redirect } from "react-router-dom";

import './App.css';
import Navbar from './common/Navbar';
import Home from './home/Home';
import Programs from './programs/Programs';
import Exercises from './exercises/Exercises';
import Profile from './profile/Profile';
import Login from './login/Login';
import Signup from './signup/Signup';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye, faEyeSlash, faUser, faKey, faEnvelope } from '@fortawesome/free-solid-svg-icons';

library.add(faEye, faEyeSlash, faUser, faKey, faEnvelope);

class App extends Component {
    render() {
        return (
            <Router className="App">
                <div className="app-container">
                    <Navbar/>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/programs" component={Programs}/>
                        <Route path="/exercises" component={Exercises}/>
                        <Route path="/profile" component={Profile}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/signup" component={Signup}/>
                        <Route path="*" render={() => <Redirect to="/"/>}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
