import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { SIGNUP_MODAL, LOGIN_MODAL } from '../constants/modalTypes'
import { showModal } from './modalActions'
import NavbarCollapse from './NavbarCollapse'
import './Navbar.css';
import AuthService from '../auth/AuthService'

const defaultProps = {
    expand: true
}

class Navbar extends React.Component {
    constructor(){
        super();
        this.Auth = new AuthService();
        this.state = {
            collapsed: true,
            isLoggedIn: this.Auth.loggedIn()
        };
    }

    toggleNavbar = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    };

    collapseNavbar = () => {
        this.setState({
            collapsed: true
        });
    };

    logout = (callback) => {
        this.Auth.logout()
        this.setState({
            isLoggedIn: this.Auth.loggedIn()
        });
    }

    render() {
        return (
            <nav className="navbar">
                <div className="container">

                    {/* Brand */}
                    <Link className="navbar-brand" to="/" onClick={this.collapseNavbar}>GymMate</Link>

                    {/* Collapse toggler button */}
                    <button onClick={this.toggleNavbar} className="navbar-toggler" type="button">
                        <span className="navbar-toggler-icon"/>
                    </button>

                    {/* Collapsible navbar items */}
                    <NavbarCollapse in={!this.state.collapsed}>
                        <ul className="navbar-nav">

                            <li className="nav-item" onClick={this.collapseNavbar}>
                                <NavLink className="nav-link" exact to="/">Home</NavLink>
                            </li>

                            <li className="nav-item" onClick={this.collapseNavbar}>
                                <NavLink className="nav-link" to="/programs">Programs</NavLink>
                            </li>

                            <li className="nav-item" onClick={this.collapseNavbar}>
                                <NavLink className="nav-link" to="/exercises">Exercises</NavLink>
                            </li>

                            <li className="nav-item" onClick={this.collapseNavbar}>
                                <NavLink className="nav-link" to="/profile">Profile</NavLink>
                            </li>
                            {!this.state.isLoggedIn ? (
                            <>
                                <li className="nav-item" onClick={this.collapseNavbar}>
                                    <button type="button"
                                        className="link-btn nav-link"
                                        onClick={this.props.openSignup}
                                    >
                                        Sign up
                                    </button>
                                </li>

                                <li className="nav-item" onClick={this.collapseNavbar}>
                                    <button type="button"
                                        className="link-btn nav-link"
                                        onClick={this.props.openLogin}
                                    >
                                        Log in
                                    </button>
                                </li>
                            </>
                            ) : (
                                <li className="nav-item" onClick={this.collapseNavbar}>
                                    <button type="button"
                                        className="link-btn nav-link"
                                        onClick={this.logout}
                                    >
                                        Log out
                                    </button>
                                </li>
                            )}
                        </ul>
                    </NavbarCollapse>
                </div>
            </nav>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        openSignup: () => {
            dispatch(showModal(SIGNUP_MODAL))
        },
        openLogin: () => {
            dispatch(showModal(LOGIN_MODAL))
        }
    }
}

Navbar.defaultProps = defaultProps
Navbar = connect(null, mapDispatchToProps)(Navbar)

export default Navbar
