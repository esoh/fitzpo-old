import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { ModalContext } from '../common/ModalContext';

class SignupContent extends React.Component {
    render(){
        return(
            <div className="modal-content">
                <ModalContext.Consumer>
                    {({ hideModal }) =>
                        <FontAwesomeIcon
                            icon={['far', 'times-circle']}
                            className="close-icon"
                            onClick={hideModal}
                        />
                    }
                </ModalContext.Consumer>
                <h1>signup modal</h1>
                <ModalContext.Consumer>
                    {({ hideModal }) => <button onClick={hideModal}>Close It</button>}
                </ModalContext.Consumer>
            </div>
        )
    }
}

export default SignupContent;
