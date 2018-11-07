import React from 'react';
import { NavLink, Link } from 'react-router-dom';

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
                                <NavLink className="nav-link" activeClassName="active" exact to="/">Home</NavLink>
                            </li>

                            <li class="nav-item">
                                <NavLink className="nav-link" activeClassName="active" to="/programs">Programs</NavLink>
                            </li>

                            <li class="nav-item">
                                <NavLink className="nav-link" activeClassName="active" to="/exercises">Exercises</NavLink>
                            </li>

                            <li class="nav-item">
                                <NavLink className="nav-link" activeClassName="active" to="/profile">Profile</NavLink>
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
