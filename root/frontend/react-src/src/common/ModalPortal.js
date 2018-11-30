import React from 'react';
import ReactDOM from 'react-dom';
import Transition, {
    EXITED,
    ENTERED,
    ENTERING,
    EXITING,
} from 'react-transition-group/Transition';

import './Modal.css'

// since 3rd party apps like to render to body, we don't want to render to body.
// Everything renders to body and if we render to body, it could break our app.
// We want to render to a div that is a child of body (root).

const appRoot = document.getElementById('root');
const duration = 150;
const defaultStyle = {
    transition: `opacity ${duration}ms linear`,
    opacity: 0,
}
// TODO: fix entering transition
const fadeStyles = {
    [EXITED]: {
        opacity: 0,
    },
    [EXITING]: {
        opacity: 0,
    },
    [ENTERING]: {
        opacity: 0,
    },
    [ENTERED]: {
        opacity: 0.5,
    },
}

class ModalPortal extends React.Component {
    constructor(){
        super();
        this.state = {
            in: false,
        };
    }

    componentDidUpdate(prevProps, prevState){
        if(!prevProps.in && this.props.in){
            this.setState({in: this.props.in});
        }
    }

    onClosed = () => {
        this.setState({ in: false })
    }

    render(){
        const ModalContent = this.props.content;
        if(this.state.in){
            return ReactDOM.createPortal(
                (
                    <div>
                        <div className="modal">
                            <div className="modal-content">
                                {!!ModalContent ? (
                                    <ModalContent/>
                                ) : (
                                    null
                                )}
                            </div>
                        </div>

                        {/* backdrop */}
                        <Transition
                            in={this.props.in}
                            timeout={duration}
                            appear
                            onExited={this.onClosed}
                        >
                            {(state) => (
                                <div
                                    className="modal-backdrop"
                                    style={{
                                        ...defaultStyle,
                                        ...fadeStyles[state]
                                    }}
                                >{console.log(state)}</div>
                            )}
                        </Transition>
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
