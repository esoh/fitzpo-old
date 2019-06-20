import React from 'react';
import { Link } from "react-router-dom";

export default function GuestNavContent(){
    return (
        <div>
            <Link to="/">Home</Link>
            <Link to="/login">Log In</Link>
            <Link to="/signup">Sign Up</Link>
        </div>
    )
}
