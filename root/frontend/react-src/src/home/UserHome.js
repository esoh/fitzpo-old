import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import { deauthenticateAccountLocally } from '../services/authService';
import { setLoggedIn } from '../redux/actions';

export class UserHome extends React.Component {

    abortController = new window.AbortController();

    componentWillUnmount() {
        this.abortController.abort();
    }

    handleLogout = (event) => {
        deauthenticateAccountLocally()
            .then(res => {
                this.props.setLoggedIn(false);
            })
            .catch(err => {
                if (err.name === 'AbortError') return;
                console.error(err)
            })
    }

    render() {
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
