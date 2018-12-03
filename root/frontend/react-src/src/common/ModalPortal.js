import React from 'react';
import ReactDOM from 'react-dom';

import './Modal.css'

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
