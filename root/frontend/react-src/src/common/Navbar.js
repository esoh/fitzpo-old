import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import { ModalContext } from './ModalContext';
import SignupContent from '../auth/SignupContent';
import LoginContent from '../auth/LoginContent';
import NavbarCollapse from './NavbarCollapse';

const defaultProps = {
    expand: true
}

class Navbar extends React.Component {
    constructor(){
        super();
        this.state = {
            collapsed: true
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


    getExpandClass(expand){
        if(!expand){
            return '';
        }
        if(expand === true){
            return ' navbar-expand';
        } else {
            return ' navbar-expand-' + expand;
        }
    }

    render() {
        return (
            <nav className={"navbar navbar-light bg-light fixed-top" + this.getExpandClass(this.props.expand)}>
                <div className="container">

                    {/* Brand */}
                    <Link className="navbar-brand" to="/" onClick={this.collapseNavbar}>GymMate</Link>

                    {/* Collapse toggler button */}
                    <button onClick={this.toggleNavbar} className="navbar-toggler" type="button">
                        <span className="navbar-toggler-icon"/>
                    </button>

                    {/* Collapsible navbar items */}
                    <NavbarCollapse in={!this.state.collapsed} expand={this.props.expand}>
                        <ModalContext.Consumer>
                            { /* grab showModal from ModalContext value */ }
                            { ({showModal}) =>
                                <ul className="navbar-nav ml-auto">

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

                                    <li className="nav-item" onClick={this.collapseNavbar}>
                                        <button type="button"
                                        className="btn btn-link nav-link text-left"
                                        onClick={() => showModal(SignupContent)}>
                                            Sign up
                                        </button>
                                    </li>

                                    <li className="nav-item" onClick={this.collapseNavbar}>
                                        <button type="button"
                                        className="btn btn-link nav-link text-left"
                                        onClick={() => showModal(LoginContent)}>
                                            Log in
                                        </button>
                                    </li>
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
