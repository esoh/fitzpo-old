import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function EntryContent(props) {
    return(
        <div className="modal-content">
            <FontAwesomeIcon
                icon={['far', 'times-circle']}
                className="close-icon"
                onClick={props.onClose}
            />
            <h1>{props.title}</h1>
            {props.children}
        </div>
    );
}

export default EntryContent;
