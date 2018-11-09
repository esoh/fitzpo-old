import React from 'react';
import { NavLink, Link } from 'react-router-dom';

class Navbar extends React.Component {
    constructor(props){
        super(props);
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        const collapsed = this.state.collapsed;
        const collapsibleNavbarClass = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
        const collapsibleNavbarTogglerClass = collapsed ? 'navbar-toggler collapsed' : 'navbar-toggler'

        return (
            <nav className="navbar navbar-expand-md navbar-light bg-light fixed-top">
                <div className="container">

                    {/* Brand */}
                    <Link className="navbar-brand" to="/">GymMate</Link>

                    {/* Collapse toggler button */}
                    <button onClick={this.toggleNavbar} className={collapsibleNavbarTogglerClass} type="button">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Collapsible navbar items */}
                    <div className={collapsibleNavbarClass}>
                        <ul className="navbar-nav ml-auto">

                            <li className="nav-item" data-toggle="collapse"
                                data-target="#navbarDefault">
                                <NavLink className="nav-link" exact to="/" >Home</NavLink>
                            </li>

                            <li className="nav-item" data-toggle="collapse"
                                data-target="#navbarDefault">
                                <NavLink className="nav-link" to="/programs">Programs</NavLink>
                            </li>

                            <li className="nav-item" data-toggle="collapse"
                                data-target="#navbarDefault">
                                <NavLink className="nav-link" to="/exercises">Exercises</NavLink>
                            </li>

                            <li className="nav-item" data-toggle="collapse"
                                data-target="#navbarDefault">
                                <NavLink className="nav-link" to="/profile">Profile</NavLink>
                            </li>

                            <li className="nav-item" data-toggle="collapse"
                                data-target="#navbarDefault">
                                <a className="nav-link">Sign up</a>
                            </li>

                            <li className="nav-item" data-toggle="collapse"
                                data-target="#navbarDefault">
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
