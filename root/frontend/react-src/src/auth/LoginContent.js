import React from 'react';

import EntryContent from './EntryContent';

function LoginContent(props) {
    return(
        <EntryContent title="Log In" onClose={props.hideModal}>
            <button onClick={props.hideModal}>Close It</button>
        </EntryContent>
    )
}

export default LoginContent;
