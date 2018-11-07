import React from 'react';

class Navbar extends React.Component {
    render() {
        return (
            <nav class="navbar navbar-expand-md navbar-light bg-light fixed-top">
                <div class="container">

                    {/* Brand */}
                    <a class="navbar-brand">GymMate</a>

                    {/* Collapse toggler button */}
                    <button class="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarDefault">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    {/* Collapsible navbar items */}
                    <div class="collapse navbar-collapse" id="navbarDefault">
                        <ul class="navbar-nav ml-auto">

                            <li class="nav-item" routerLinkActive='active'>
                                <a class="nav-link">Home</a>
                            </li>

                            <li class="nav-item" routerLinkActive='active'>
                                <a class="nav-link">Programs</a>
                            </li>

                            <li class="nav-item" routerLinkActive='active'>
                                <a class="nav-link">Exercises</a>
                            </li>

                            <li class="nav-item" routerLinkActive='active'>
                                <a class="nav-link">Profile</a>
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
