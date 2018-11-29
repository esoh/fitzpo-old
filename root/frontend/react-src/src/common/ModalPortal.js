import React from 'react';
import ReactDOM from 'react-dom';

import './Modal.css'

// since 3rd party apps like to render to body, we don't want to render to body.
// Everything renders to body and if we render to body, it could break our app.
// We want to render to a div that is a child of body (root).

const appRoot = document.getElementById('root');

class ModalPortal extends React.Component {
    render(){
        return ReactDOM.createPortal(
            (
                <div className="modal">
                    <div className="modal-content">
                        {this.props.children}
                    </div>
                </div>
            ),
            appRoot
        );
    }
}

export default ModalPortal;
