import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import GuestHome from './GuestHome';
import UserHome from './UserHome';

function Home(props) {
    const isLoggedIn = props.isLoggedIn;
    if(isLoggedIn) {
        return <UserHome />
    }
    return <GuestHome />
}

Home.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
}

export default connect(
    function mapStateToProps(state){
        return { isLoggedIn: state.auth.isLoggedIn }
    },
    null
)(Home)
