import React from 'react';
import { NavLink, Link } from 'react-router-dom';

class Navbar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-light bg-light fixed-top">
                <div className="container">

                    {/* Brand */}
                    <Link className="navbar-brand" to="/">GymMate</Link>

                    {/* Collapse toggler button */}
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarDefault">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Collapsible navbar items */}
                    <div className="collapse navbar-collapse" id="navbarDefault">
                        <ul className="navbar-nav ml-auto">

                            <li className="nav-item">
                                <NavLink className="nav-link" activeclass="active" exact to="/">Home</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" activeclass="active" to="/programs">Programs</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" activeclass="active" to="/exercises">Exercises</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" activeclass="active" to="/profile">Profile</NavLink>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link">Sign up</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link">Log in</a>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;
