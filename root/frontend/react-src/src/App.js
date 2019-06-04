import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './App.css';
import Signup from './entry/Signup';
import Login from './entry/Login';
import Home from './home/Home';
import { setLoggedIn } from './redux/actions';
import { checkLoggedIn, deauthenticateAccountLocally } from './services/authService';

export class App extends React.Component {

    abortController = new window.AbortController();

    componentDidMount() {
        checkLoggedIn()
            .then(response => {
                if(!response){
                    return this.props.setLoggedIn(false);
                }

                if(response.error){
                    // TODO: redirect user to You have been logged out page
                    console.error(response)

                    // ask server to send token clear to client
                    deauthenticateAccountLocally()
                        .then(deauthRes => {
                            if(deauthRes) console.error("deauth response is supposed to be empty??");
                        })
                        .catch(err => {
                            if(err.name === 'AbortError') return;
                            console.error(err);
                        })

                    return this.props.setLoggedIn(false);
                }

                if(!response.user){
                    console.error("No user found??")
                    return this.props.setLoggedIn(false);
                }

                return this.props.setLoggedIn(true);
            })
            .catch(err => {
                if (err.name === 'AbortError') return;
                console.error(err)
                return this.props.setLoggedIn(false);
            })
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/signup' component={Signup} />
                    <Route path='/login' component={Login} />
                </Switch>
            </Router>
        );
    }
}

App.propTypes = {
    setLoggedIn: PropTypes.func.isRequired,
}

export default connect(
    null,
    { setLoggedIn }
)(App)
