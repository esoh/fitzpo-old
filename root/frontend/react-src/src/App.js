import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './App.css';
import Signup from './entry/Signup';
import Login from './entry/Login';
import Home from './home/Home';
import { setLoggedIn } from './redux/actions';
import { checkLoggedIn } from './services/authService';

class App extends React.Component {
    componentDidMount() {
        checkLoggedIn()
            .then(response => {
                if(!response){
                    return this.props.setLoggedIn(false);
                }

                if(response.error){
                    // TODO: clear cookie and user info
                    console.error(response)
                    return this.props.setLoggedIn(false);
                }

                if(!response.account){
                    console.error("No account found??")
                    return this.props.setLoggedIn(false);
                }

                return this.props.setLoggedIn(true);
            })
            .catch(err => {
                console.error(err)
                return this.props.setLoggedIn(false);
            })
    }

    render() {
        return (
            <Router>
                <Route path='/' exact component={Home} />
                <Route path='/signup' component={Signup} />
                <Route path='/login' component={Login} />
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
