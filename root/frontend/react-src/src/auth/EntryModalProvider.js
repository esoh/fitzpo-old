import React from 'react';

import './ModalProvider.css';
import ModalPortal from '../common/ModalPortal';
import { EntryModalContext } from './EntryModalContext';


class EntryModalProvider extends React.Component {
    showModal = (content, props = {}) => {
        this.setState({
            content,
            props
        });
    };

    hideModal = () =>
        this.setState({
            content: null,
            props: {}
        });

    state = {
        content: null,
        props: {},
        showModal: this.showModal,
        hideModal: this.hideModal
    };

    render(){
        const ModalContent = this.state.content;
        return(
            <EntryModalContext.Provider value={this.state}>
                {this.props.children}
                {ModalContent ? (
                    <ModalPortal>
                        <ModalContent />
                    </ModalPortal>
                ) : (
                    null
                )}
            </EntryModalContext.Provider>
        );
    }
}

export default EntryModalProvider;
