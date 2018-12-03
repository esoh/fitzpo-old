import React from 'react';

import EntryContent from './EntryContent';

class SignupContent extends React.Component {
    render(){
        return(
            <EntryContent title="Sign Up" onClose={this.props.hideModal}>
                <button onClick={this.props.hideModal}>Close It</button>
            </EntryContent>
        )
    }
}

export default SignupContent;
