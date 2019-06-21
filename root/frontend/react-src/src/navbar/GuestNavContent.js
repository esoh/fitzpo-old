import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './NavContent.module.scss'

export default function GuestNavContent(){
    let linkProps = {
        className: styles.link,
        activeClassName: styles.active,
    }
    return (
        <>
            <NavLink {...linkProps} exact to="/">Home</NavLink>
            <NavLink {...linkProps} to="/login">Log In</NavLink>
            <NavLink {...linkProps} to="/signup">Sign Up</NavLink>
        </>
    )
}
