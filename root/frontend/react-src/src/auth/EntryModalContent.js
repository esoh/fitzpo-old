import React from 'react';
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { SIGNUP_MODAL, LOGIN_MODAL } from '../constants/modalTypes'
import { showModal, hideModal } from '../common/modalActions'
import SignupContent from './SignupContent';
import LoginContent from './LoginContent';
import '../common/Modal.css';

let EntryModalContent = (props) => {
    return(
        <div className="modal-content">
            <FontAwesomeIcon
                icon={['far', 'times-circle']}
                className="close-icon"
                onClick={props.hideModal}
            />
            {props.modalType === SIGNUP_MODAL ? (
                <SignupContent
                    altEntry={props.openLogin}
                    hideModal={props.hideModal}
                    {...props.modalProps}
                />
            ) : (
                <LoginContent
                    altEntry={props.openSignup}
                    hideModal={props.hideModal}
                    {...props.modalProps}
                />
            )}
        </div>
    );
}

const mapStateToProps = state => {
    return { modalType: state.modal.modalType, modalProps: state.modal.modalProps }
}

const mapDispatchToProps = dispatch => {
    return {
        hideModal: () => dispatch(hideModal()),
        openSignup: () => dispatch(showModal(SIGNUP_MODAL)),
        openLogin: () => dispatch(showModal(LOGIN_MODAL)),
    }
}

EntryModalContent = connect(
    mapStateToProps,
    mapDispatchToProps
)(EntryModalContent)

export default EntryModalContent
