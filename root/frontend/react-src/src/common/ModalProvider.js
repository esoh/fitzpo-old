import React from 'react';

import ModalPortal from './ModalPortal';
import { ModalContext } from './ModalContext';


class ModalProvider extends React.Component {
    showModal = (content, props = {}) => {
        this.setState({
            content,
            props,
            isOpen: true
        });
    };

    hideModal = () => {
        this.setState({
            isOpen: false,
        });
    };

    // TODO: do we even need this?
    detachModal = () => {
        this.setState({
            content: null,
            props: {}
        });
    }

    state = {
        content: null,
        isOpen: false,
        props: {},
        showModal: this.showModal,
        hideModal: this.hideModal
    };

    render(){
        const ModalContent = this.state.content;
        return(
            <ModalContext.Provider value={this.state}>
                {this.props.children}
                <ModalPortal in={this.state.isOpen} content={ModalContent} />
            </ModalContext.Provider>
        );
    }
}

export default ModalProvider;
