import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import SignupContent from './SignupContent';
import LoginContent from './LoginContent';
import '../common/Modal.css';

function EntryModal(props) {
    return(
        <div className="modal-content">
            <FontAwesomeIcon
                icon={['far', 'times-circle']}
                className="close-icon"
                onClick={props.onClose}
            />
            {props.children}
        </div>
    );
}

export function SignupModal(props) {
    return (
        <EntryModal onClose={props.hideModal}>
            <SignupContent/>
        </EntryModal>
    )
}

export function LoginModal(props) {
    return (
        <EntryModal onClose={props.hideModal}>
            <LoginContent/>
        </EntryModal>
    )
}
