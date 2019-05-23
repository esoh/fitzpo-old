import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from "react-router-dom";

import { deauthenticateAccountLocally } from '../services/authService';
import { setLoggedIn } from '../redux/actions';

class UserHome extends React.Component {
    state = { redirect: false, }

    handleLogout = (event) => {
        deauthenticateAccountLocally()
            .then(res => {
                this.setState({ redirect: true })
                this.props.setLoggedIn(false)
            })
            .catch(err => console.error(err))
    }

    render() {
        if (this.state.redirect) return <Redirect to='/login' />;

        return (
            <>
                <p>Welcome {this.props.username}</p>
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
