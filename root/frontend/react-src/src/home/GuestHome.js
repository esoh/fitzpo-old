import React from 'react';
import { Link } from "react-router-dom";

class GuestHome extends React.Component {
    render() {
        return (
            <>
                <p>Welcome to Fitzpo!</p>
                <div>
                    <Link to="/signup">Sign Up</Link>
                    <Link to="/login">Log In</Link>
                </div>
            </>
        )
    }
}

export default GuestHome;
