import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import GuestHome from './GuestHome';
import UserHome from './UserHome';

export function Home(props) {
    const isLoggedIn = props.isLoggedIn;

    if(isLoggedIn === true) {
        return <UserHome />;
    } else if(isLoggedIn === false){
        return <GuestHome />;
    }
    // login state not yet retrieved from api server
    return null;
}

Home.propTypes = {
    isLoggedIn: PropTypes.bool,
}

export default connect(
    function mapStateToProps(state){
        return { isLoggedIn: state.auth.isLoggedIn }
    },
    null
)(Home)
