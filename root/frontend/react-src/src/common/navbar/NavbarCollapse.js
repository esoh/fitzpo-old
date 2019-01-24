import React from 'react';
import PropTypes from 'prop-types'
import Transition, {
    EXITED,
    ENTERED,
    ENTERING,
    EXITING,
} from 'react-transition-group/Transition';

const duration = 350;
const collapseStyles = {
    [EXITED]: {
        display: 'none',
    },
    [EXITING]: {
        position: 'relative',
        overflow: 'hidden',
        transition: `height ${duration}ms ease`,
    },
    [ENTERING]: {
        position: 'relative',
        overflow: 'hidden',
        transition: `height ${duration}ms ease`,
    },
    [ENTERED]: {
        display: 'block',
    },
}
const propTypes = {
    in: PropTypes.bool,
}

const expandWidth = 768;

class NavbarCollapse extends React.Component {

    /* Handle css element heights for animations to adjust heights*/
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
        elem.style['height'] = `${elem['offsetHeight']}px`;
        this.forceReflow(elem);
    };

    onExiting = elem => {
        // prevent closing animation from closing to 0 when navbar is expanded
        if(window.innerWidth < expandWidth){
            elem.style['height'] = '0';
        }
    };

    forceReflow(node) {
        node.offsetHeight; // eslint-disable-line no-unused-expressions
    }

    render() {
        return (
            <Transition
                in={this.props.in}
                timeout={duration}
                onEnter={this.onEnter}
                onEntering={this.onEntering}
                onEntered={this.onEntered}
                onExit={this.onExit}
                onExiting={this.onExiting}
            >
                {state => { return(
                    <div className='navbar-collapse' style={{...collapseStyles[state]}}>
                        {this.props.children}
                    </div>
                ) }}
            </Transition>
        )
    }
}

NavbarCollapse.propTypes = propTypes

export default NavbarCollapse;
