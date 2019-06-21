import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import GuestHome from './GuestHome';
import UserHome from './UserHome';
import styles from './Home.module.scss';

export function Home(props) {
    const isLoggedIn = props.isLoggedIn;

    if(isLoggedIn !== null){
        return (
            <div className={styles.center}>
                <div className={classNames(styles.content, styles.home)}>
                    {(isLoggedIn) ? <UserHome /> : <GuestHome />}
                </div>
            </div>
        )
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
