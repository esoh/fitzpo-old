import React from 'react';

class UserHome extends React.Component {
    render() {
        return (
            <>
                <p>Welcome {this.props.username}</p>
                <button>
                    Log Out
                </button>
            </>
        )
    }
}

export default UserHome;
