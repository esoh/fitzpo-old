import React from 'react';

import Modal from './Modal';
import { ModalContext } from './ModalContext';


class ModalProvider extends React.Component {

    showModal = (content, props = {}) => {
        this.setState({
            content,
            props,
            isOpen: true,
        });
    };

    hideModal = () => {
        this.setState({
            isOpen: false,
        });
    };

    // initial state
    state = {
        content: null,
        props: {},
        showModal: this.showModal,
        hideModal: this.hideModal,
        isOpen: false,
    };

    render(){
        const ModalContent = this.state.content;
        return(
            <ModalContext.Provider value={this.state}>
                {this.props.children}
                <Modal
                    isOpen={this.state.isOpen}
                    hideModal={this.hideModal}
                >
                    {!!ModalContent ? (
                        <ModalContent
                            hideModal={this.hideModal}
                            {...this.state.props}
                        />
                    ) : null}
                </Modal>
            </ModalContext.Provider>
        );
    }
}

export default ModalProvider;
