import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class SignupContent extends React.Component {
    render(){
        return(
            <div className="modal-content">
                <FontAwesomeIcon
                    icon={['far', 'times-circle']}
                    className="close-icon"
                    onClick={this.props.hideModal}
                />
                <h1>signup modal</h1>
                <button onClick={this.props.hideModal}>Close It</button>
            </div>
        )
    }
}

export default SignupContent;
