import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import { ModalContext } from './ModalContext';
import EntryModal from '../auth/EntryContent';
import NavbarCollapse from './NavbarCollapse';
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
        console.log(this.Auth.loggedIn());
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
                        <ModalContext.Consumer>
                            { /* grab showModal from ModalContext value */ }
                            { ({showModal}) =>
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
                                                onClick={() => showModal(EntryModal, {isSignup: true})}
                                            >
                                                Sign up
                                            </button>
                                        </li>

                                        <li className="nav-item" onClick={this.collapseNavbar}>
                                            <button type="button"
                                                className="link-btn nav-link"
                                                onClick={() => showModal(EntryModal, {isSignup: false})}
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
                            }
                        </ModalContext.Consumer>
                    </NavbarCollapse>
                </div>
            </nav>
        );
    }
}

Navbar.defaultProps = defaultProps;

export default Navbar;
