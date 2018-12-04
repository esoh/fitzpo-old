import React from 'react';

import EntryContent from './EntryContent';

function SignupContent(props) {
    return(
        <EntryContent title="Sign Up" onClose={props.hideModal}>
            <button onClick={props.hideModal}>Close It</button>
        </EntryContent>
    )
}

export default SignupContent;
