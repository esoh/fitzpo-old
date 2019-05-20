import React from 'react';
import { Link } from "react-router-dom";

class GuestHome extends React.Component {
    render() {
        return (
            <>
                <p>Welcome to Fitzpo!</p>
                <ul>
                    <li>
                        <Link to="/signup">Sign Up</Link>
                    </li>
                    <li>
                        <Link to="/login">Log In</Link>
                    </li>
                </ul>
            </>
        )
    }
}

export default GuestHome;
