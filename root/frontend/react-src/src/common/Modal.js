import React from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

import Portal from './Portal';
import './Modal.css';

// since 3rd party apps like to render to body, we don't want to render to body.
// Everything renders to body and if we render to body, it could break our app.
// We want to render to a div that is a child of body (root).

const fadeDuration = 300;
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

const propTypes = {
    isOpen: PropTypes.bool,
    hideModal: PropTypes.func,
};

const defaultProps = {
    isOpen: false,
}

class Modal extends React.Component {
    constructor(props){
        super(props);
        // state of modal being open, necessary for persistence after
        //   props.isOpen turns false, but Modal must still fade out
        this.state = {
            isOpen: props.isOpen,
        };

        // callback ref to store reference to modal-dialog
        this._modalDialog = null;
        this.setModalDialogRef = e => {
            this._modalDialog = e;
        };
    }

    // set modal state to `open` when props changes from not open to open
    static getDerivedStateFromProps(props, state) {
        if(props.isOpen && !state.isOpen){
            return { isOpen: props.isOpen };
        }
        else return null;
    }

    // if modal is shown, set focus and update body classname
    componentDidUpdate(prevProps, prevState) {
        if (this.state.isOpen && !prevState.isOpen && this._modalDialog) {
            this._modalDialog.parentNode.focus();
            document.body.classList.add("modal-open");
        }
    }

    // called by the animation. When props.isOpen=false, the fade animation
    //   will play because its `in` prop is set to props.isOpen.
    //   It will call this function on the animation's onExited.
    onClosed = () => {
        this.setState({ isOpen: false });
        document.body.classList.remove("modal-open");
    }

    // called when a click happens and it's not in the modalDialog. Hides the
    //   modal
    handleBackdropClick = e => {
        if(this._modalDialog && !this._modalDialog.contains(e.target)){
            this.props.hideModal(e);
        }
    }

    // called when escape key is pressed. Hides the modal
    handleEscape = e => {
        if(this.props.isOpen && e.keyCode === 27){
            this.props.hideModal(e);
        }
    }

    render(){
        if(this.state.isOpen){
            return (
                <Portal>
                    {/* modal window */}
                    <CSSTransition
                        in={this.props.isOpen}
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
                                {this.props.children}
                            </div>
                        </div>
                    </CSSTransition>

                    {/* backdrop */}
                    <CSSTransition
                        in={this.props.isOpen}
                        timeout={fadeDuration}
                        classNames={backdropFadeClasses}
                        appear
                    >
                        <div className="modal-backdrop"/>
                    </CSSTransition>
                </Portal>
            );
        } else {
            return null;
        }
    }
}

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export default Modal;
