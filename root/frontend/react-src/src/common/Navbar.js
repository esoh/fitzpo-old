import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import css from 'dom-helpers/style';
import Transition, {
    EXITED,
    ENTERED,
    ENTERING,
    EXITING,
} from 'react-transition-group/Transition';

const duration = 300;
const collapseStyles = {
    [EXITED]: 'collapse',
    [EXITING]: 'collapsing',
    [ENTERING]: 'collapsing',
    [ENTERED]: 'collapse show',
};
const defaultProps = {
    expand: true
}

function getExpandWidthValue(expandWidthType){
    switch(expandWidthType){
        case 'sm':
            return 576;
        case 'md':
            return 768;
        case 'lg':
            return 992;
        case 'xl':
            return 1200;
        default:
            return undefined;
    }
}

function getHeightValue(elem) {
    return (
        elem['offsetHeight'] +
        parseInt(css(elem, 'marginTop'), 10) +
        parseInt(css(elem, 'marginBottom'), 10)
    );
}


class Navbar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            collapsed: true
        };
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.collapseNavbar = this.collapseNavbar.bind(this);
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    collapseNavbar() {
        this.setState({
            collapsed: true
        });
    }

    /* Handle css element heights for bootstrap.css animations to apply */
    onEnter = elem => {
        elem.style['height'] = '0';
    };

    onEntering = elem => {
        elem.style['height'] = `${elem['scrollHeight']}px`;
        this.forceReflow(elem);
    };

    onEntered = elem => {
        elem.style['height'] = null;
    };

    onExit = elem => {
        elem.style['height'] = `${getHeightValue(elem)}px`;
        this.forceReflow(elem);
    };

    onExiting = elem => {
        // prevent closing animation from closing to 0 when navbar is expanded
        if(!this.props.expand || window.innerWidth < getExpandWidthValue(this.props.expand)){
            elem.style['height'] = '0';
        }
    };

    forceReflow(node) {
        node.offsetHeight; // eslint-disable-line no-unused-expressions
    }

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
        const collapsed = this.state.collapsed;
        const collapsibleNavbarTogglerClass = collapsed ? 'navbar-toggler collapsed' : 'navbar-toggler';

        return (
            <nav className={"navbar navbar-light bg-light fixed-top" + this.getExpandClass(this.props.expand)}>
                <div className="container">

                    {/* Brand */}
                    <Link className="navbar-brand" to="/" onClick={this.collapseNavbar}>GymMate</Link>

                    {/* Collapse toggler button */}
                    <button onClick={this.toggleNavbar} className={collapsibleNavbarTogglerClass} type="button">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Collapsible navbar items */}
                    <Transition
                        in={!collapsed}
                        timeout={duration}
                        onEnter={this.onEnter}
                        onEntering={this.onEntering}
                        onEntered={this.onEntered}
                        onExit={this.onExit}
                        onExiting={this.onExiting}
                    >
                        {state => { return(
                            <div className={"navbar-collapse " + collapseStyles[state]}>
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
                                        <a className="nav-link">Sign up</a>
                                    </li>

                                    <li className="nav-item" onClick={this.collapseNavbar}>
                                        <a className="nav-link">Log in</a>
                                    </li>

                                </ul>
                            </div>
                        );}}
                    </Transition>
                </div>
            </nav>
        );
    }
}

Navbar.defaultProps = defaultProps;

export default Navbar;
