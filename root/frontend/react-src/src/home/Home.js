import React from 'react';
import GuestHome from './GuestHome'
import UserHome from './UserHome'

export default function Home(props) {
    const isLoggedIn = props.loggedIn;
    if(isLoggedIn) {
        return <UserHome />
    }
    return <GuestHome />
}
