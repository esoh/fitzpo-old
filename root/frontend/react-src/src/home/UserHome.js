import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect, Link } from "react-router-dom";

import { deauthenticateAccountLocally } from '../services/authService';
import { setLoggedIn } from '../redux/actions';

export class UserHome extends React.Component {

    abortController = new window.AbortController();

    state = { redirect: false, }

    componentWillUnmount() {
        this.abortController.abort();
    }

    handleLogout = (event) => {
        deauthenticateAccountLocally()
            .then(res => {
                this.setState({ redirect: true })
                this.props.setLoggedIn(false)
            })
            .catch(err => {
                if (err.name === 'AbortError') return;
                console.error(err)
            })
    }

    render() {
        if (this.state.redirect) return <Redirect to='/login' />;

        return (
            <>
                <p>Welcome {this.props.username}</p>
                <Link to="/exercise-logs">My Exercise Log</Link>
                <button onClick={this.handleLogout}>
                    Log Out
                </button>
            </>
        )
    }
}

UserHome.propTypes = {
    setLoggedIn: PropTypes.func.isRequired,
}

export default connect(
    null,
    { setLoggedIn }
)(UserHome)
