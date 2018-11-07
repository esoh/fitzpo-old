import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
    render() {
        return (
            <nav class="navbar navbar-expand-md navbar-light bg-light fixed-top">
                <div class="container">

                    {/* Brand */}
                    <Link className="navbar-brand" to="/">GymMate</Link>

                    {/* Collapse toggler button */}
                    <button class="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarDefault">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    {/* Collapsible navbar items */}
                    <div class="collapse navbar-collapse" id="navbarDefault">
                        <ul class="navbar-nav ml-auto">

                            <li class="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>

                            <li class="nav-item">
                                <Link className="nav-link" to="/programs">Programs</Link>
                            </li>

                            <li class="nav-item">
                                <Link className="nav-link" to="/exercises">Exercises</Link>
                            </li>

                            <li class="nav-item">
                                <Link className="nav-link" to="/profile">Profile</Link>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link">Sign up</a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link">Log in</a>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;
