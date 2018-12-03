import React from 'react';
import { ModalContext } from '../common/ModalContext';

class SignupContent extends React.Component {
    render(){
        return(
            <div className="modal-content">
                <h1>signup modal</h1>
                <ModalContext.Consumer>
                    {({ hideModal }) => <button onClick={hideModal}>Close It</button>}
                </ModalContext.Consumer>
            </div>
        )
    }
}

export default SignupContent;
