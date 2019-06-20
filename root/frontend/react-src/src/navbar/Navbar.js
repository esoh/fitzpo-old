import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Icon from './Icon';
import styles from './Navbar.module.scss';
import UserNavContent from './UserNavContent';
import GuestNavContent from './GuestNavContent';

export function Navbar(props){
    var content = null;
    if(props.isLoggedIn !== null){
        content = (props.isLoggedIn) ? <UserNavContent /> : <GuestNavContent />;
    }
    return (
        <nav className={styles.nav}>
            <div className={styles.spacer}/>
            <div className={styles.navFixed}>
                <div className={styles.container}>
                    {/* Brand */}
                    <Link to="/" className={styles.brand}>
                        <div>
                            <Icon className={styles.brandIcon}/>
                            <p className={styles.brandName}>fitzpo</p>
                        </div>
                    </Link>

                    <div>
                        {content}
                    </div>
                </div>
            </div>
        </nav>
    )
}

Navbar.propTypes = {
    isLoggedIn: PropTypes.bool,
}

export default connect(
    function mapStateToProps(state){
        return { isLoggedIn: state.auth.isLoggedIn }
    },
    null
)(Navbar)
