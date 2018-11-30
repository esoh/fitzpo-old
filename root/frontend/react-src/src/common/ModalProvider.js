import React from 'react';

import ModalPortal from './ModalPortal';
import { ModalContext } from './ModalContext';


class ModalProvider extends React.Component {
    showModal = (content, props = {}) => {
        this.setState({
            content,
            props
        });
    };

    hideModal = () => {
        this.setState({
            content: null,
            props: {}
        });
    };

    state = {
        content: null,
        props: {},
        showModal: this.showModal,
        hideModal: this.hideModal
    };

    render(){
        const ModalContent = this.state.content;
        return(
            <ModalContext.Provider value={this.state}>
                {this.props.children}
                <ModalPortal in={!!ModalContent} content={ModalContent} />
            </ModalContext.Provider>
        );
    }
}

export default ModalProvider;
