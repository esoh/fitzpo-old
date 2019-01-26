import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { logOut } from '../../auth/authActions'
import { SIGNUP_MODAL, LOGIN_MODAL } from '../../constants/modalTypes'
import { APP_NAME } from '../../constants/appConstants'
import { showModal } from '../modal/modalActions'
import NavbarCollapse from './NavbarCollapse'
import './Navbar.css';
import AuthService from '../../auth/AuthService'
import Icon from '../Icon'

const propTypes = {
    openSignup: PropTypes.func,
    openLogin: PropTypes.func,
    location: PropTypes.object,
}

class Navbar extends React.Component {
    constructor(){
        super();
        this.Auth = new AuthService();
        this.state = {
            collapsed: true
            // isLoggedIn: this.Auth.loggedIn()
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
        // this.setState({
        //     isLoggedIn: this.Auth.loggedIn()
        // });
        this.props.logOut()
    }

    render() {
        return (
            <nav className="navbar">
                <div className="container">

                    {/* Brand */}
                    <Link className="navbar-brand" to="/" onClick={this.collapseNavbar}>
                        <div>
                            <Icon />
                            <p>{APP_NAME}</p>
                        </div>
                    </Link>

                    {/* Collapse toggler button */}
                    <button onClick={this.toggleNavbar} className="navbar-toggler" type="button">
                        <span className="navbar-toggler-icon"/>
                    </button>

                    {/* Collapsible navbar items */}
                    <NavbarCollapse in={!this.state.collapsed}>
                        <ul className="navbar-nav">

                            <li className="nav-item" onClick={this.collapseNavbar}>
                                <button className="link-btn">
                                    <NavLink className="nav-link" exact to="/">Home</NavLink>
                                </button>
                            </li>

                            <li className="nav-item" onClick={this.collapseNavbar}>
                                <button className="link-btn">
                                    <NavLink className="nav-link" to="/programs">Programs</NavLink>
                                </button>
                            </li>

                            <li className="nav-item" onClick={this.collapseNavbar}>
                                <button className="link-btn">
                                    <NavLink className="nav-link" to="/exercises">Exercises</NavLink>
                                </button>
                            </li>

                            {!this.props.loggedIn/*this.state.isLoggedIn*/ ? (
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
                                <>
                                    <li className="nav-item" onClick={this.collapseNavbar}>
                                        <button type="button" className="link-btn">
                                            <NavLink className="nav-link" to="/profile">Profile</NavLink>
                                        </button>
                                    </li>

                                    <li className="nav-item" onClick={this.collapseNavbar}>
                                        <button type="button"
                                            className="link-btn nav-link"
                                            onClick={this.logout}
                                        >
                                            Log out
                                        </button>
                                    </li>
                                </>
                            )}
                        </ul>
                    </NavbarCollapse>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn
    }
}

const mapDispatchToProps = dispatch => {
    return {
        openSignup: () => {
            dispatch(showModal(SIGNUP_MODAL))
        },
        openLogin: () => {
            dispatch(showModal(LOGIN_MODAL))
        },

        logOut: () => {
            dispatch(logOut())
        }
    }
}

Navbar.propTypes = propTypes
Navbar = connect(mapStateToProps, mapDispatchToProps)(Navbar)

export default Navbar
