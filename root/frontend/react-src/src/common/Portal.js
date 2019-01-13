import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const propTypes = {
    children: PropTypes.node.isRequired,
}

// Portal used for components that want to render outside of their scope
class Portal extends React.Component {
    constructor(){
        super();

        // create default portal node.
        // portalNode is the node that is attached out of scope. It wraps the
        // content.
        this.portalNode = document.createElement('div');
        document.body.appendChild(this.portalNode);
    }

    componentWillUnmount() {
        document.body.removeChild(this.portalNode);
        this.portalNode = null;
    }

    render() {
        return ReactDOM.createPortal(
            this.props.children,
            this.portalNode
        );
    }
}

Portal.propTypes = propTypes;

export default Portal;
