import React from 'react';

import EntryContent from './EntryContent';

class LoginContent extends React.Component {
    render(){
        return(
            <EntryContent title="Log In" onClose={this.props.hideModal}>
                <button onClick={this.props.hideModal}>Close It</button>
            </EntryContent>
        )
    }
}

export default LoginContent;
