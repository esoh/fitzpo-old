import React from 'react';

import './ModalProvider.css';
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
                {ModalContent ? (
                    <ModalPortal>
                        <ModalContent />
                    </ModalPortal>
                ) : (
                    null
                )}
            </ModalContext.Provider>
        );
    }
}

export default ModalProvider;
