import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import SignupContent from './SignupContent';
import LoginContent from './LoginContent';
import '../common/Modal.css';

class EntryModal extends React.Component {
    state = {
        isSignup: this.props.isSignup
    };

    alternate = () => {
        this.setState({
            isSignup: !this.state.isSignup
        });
    }

    render(){
        return(
            <div className="modal-content">
                <FontAwesomeIcon
                    icon={['far', 'times-circle']}
                    className="close-icon"
                    onClick={this.props.hideModal}
                />
                {this.state.isSignup ? (
                    <SignupContent altEntry={this.alternate}/>
                ) : (
                    <LoginContent altEntry={this.alternate}/>
                )}
            </div>
        );
    }
}

export default EntryModal;
