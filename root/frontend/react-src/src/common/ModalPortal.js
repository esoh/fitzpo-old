import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import './Modal.css'

// since 3rd party apps like to render to body, we don't want to render to body.
// Everything renders to body and if we render to body, it could break our app.
// We want to render to a div that is a child of body (root).

const appRoot = document.getElementById('root');
const fadeDuration = 150;
const modalDuration = 300;
const modalFadeClasses = {
    enter: 'fade-show',
    enterActive: 'fade-show',
    enterDone: 'fade-show',
    exit: 'fade-hide',
    exitActive: 'fade-hide',
    exitDone: 'fade-hide',
    appearActive: 'fade-show'
};
const backdropFadeClasses = {
    enter: 'modal-backdrop-show',
    enterActive: 'modal-backdrop-show',
    enterDone: 'modal-backdrop-show',
    exit: 'modal-backdrop-hide',
    exitActive: 'modal-backdrop-hide',
    exitDone: 'modal-backdrop-hide',
    appearActive: 'modal-backdrop-show'
};

class ModalPortal extends React.Component {
    constructor(){
        super();
        this.state = {
            in: false,
            content: null,
            modalProps: {},
        };
        this._modalDialog = null;
        this.setModalDialogRef = e => {
            this._modalDialog = e;
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.in && !prevState.in){
            return {
                in: nextProps.in,
                content: nextProps.content,
                modalProps: nextProps.modalProps,
            };
        } else {
            return null;
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.in && !prevState.in && this._modalDialog) {
            this._modalDialog.parentNode.focus();
        }
    }

    onClosed = () => {
        this.setState({
            in: false,
            content: null,
            modalProps: {},
        })
    }

    handleBackdropClick = e => {
        if(this._modalDialog && !this._modalDialog.contains(e.target)){
            this.props.hideModal(e);
        }
    }

    handleEscape = e => {
        if(this.props.in && e.keyCode === 27){
            this.props.hideModal(e);
        }
    }

    render(){
        const ModalContent = this.state.content;
        if(this.state.in){
            return ReactDOM.createPortal(
                (
                    <div>
                        {/* modal window */}
                        <CSSTransition
                            in={this.props.in}
                            timeout={modalDuration}
                            onExited={this.onClosed}
                            classNames={modalFadeClasses}
                            className="modal"
                            role="dialog"
                            onClick={this.handleBackdropClick}
                            onKeyDown={this.handleEscape}
                            tabIndex="-1"
                            appear
                        >
                            <div className="modal">
                                <div className="modal-dialog"
                                    role="document"
                                    ref={this.setModalDialogRef}
                                >
                                    <ModalContent
                                        {...this.state.modalProps}
                                        hideModal={this.props.hideModal}
                                    />
                                </div>
                            </div>
                        </CSSTransition>

                        {/* backdrop */}
                        <CSSTransition
                            in={this.props.in}
                            timeout={fadeDuration}
                            classNames={backdropFadeClasses}
                            appear
                        >
                            <div className="modal-backdrop"/>
                        </CSSTransition>
                    </div>
                ),
                appRoot
            );
        } else {
            return null;
        }
    }
}

export default ModalPortal;
