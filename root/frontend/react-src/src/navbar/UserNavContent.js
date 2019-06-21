import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './NavContent.module.scss'

export default function UserNavContent(){
    let linkProps = {
        className: styles.link,
        activeClassName: styles.active,
    }
    return (
        <>
            <NavLink {...linkProps} exact to='/'>Home</NavLink>
            <NavLink {...linkProps} to='/exercise-logs'>My Logs</NavLink>
        </>
    )
}
