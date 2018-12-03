import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class EntryContent extends React.Component {
    render(){
        return(
            <div className="modal-content">
                <FontAwesomeIcon
                    icon={['far', 'times-circle']}
                    className="close-icon"
                    onClick={this.props.onClose}
                />
                <h1>{this.props.title}</h1>
                {this.props.children}
            </div>
        );
    }
}

export default EntryContent;
