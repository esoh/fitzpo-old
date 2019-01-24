import React from 'react'
import { connect } from 'react-redux'

import { hideModal } from './modalActions'
import Modal from './Modal'
import EntryModalContent from '../../auth/EntryModalContent'

const getModalContent = (modalType, modalProps) => {
    return (<EntryModalContent modalType={modalType}/>)
}

const mapStateToProps = state => {
    // pass isOpen and prop
    return {
        children: getModalContent(state.modal.modalType, state.modal.modalProps),
        isOpen: state.modal.modalOpen
    }
}

const mapDispatchToProps = dispatch => {
    return { hideModal: () => dispatch(hideModal()) }
}

const ModalContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Modal)

export default ModalContainer
