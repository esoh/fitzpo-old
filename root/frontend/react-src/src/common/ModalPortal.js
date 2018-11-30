import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import './Modal.css'

// since 3rd party apps like to render to body, we don't want to render to body.
// Everything renders to body and if we render to body, it could break our app.
// We want to render to a div that is a child of body (root).

const appRoot = document.getElementById('root');
const duration = 150;

class ModalPortal extends React.Component {
    constructor(){
        super();
        this.state = {
            in: false,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.in && !prevState.in){
            return {in: nextProps.in};
        } else {
            return null;
        }
    }

    //TODO: attach onClosed to modal, not modal-backdrop
    onClosed = () => {
        this.setState({ in: false })
    }

    render(){
        const ModalContent = this.props.content;
        if(this.state.in){
            return ReactDOM.createPortal(
                (
                    <div>
                        <div className="modal" role="dialog">
                            <div className="modal-dialog" role="document">
                                {!!ModalContent ? (
                                    <ModalContent/>
                                ) : (
                                    null
                                )}
                            </div>
                        </div>

                        {/* backdrop */}
                        <CSSTransition
                            in={this.props.in}
                            timeout={duration}
                            classNames="modal-backdrop"
                            appear
                            onExited={this.onClosed}
                        >
                            {(state) => (
                                <div className="modal-backdrop"/>
                            )}
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
