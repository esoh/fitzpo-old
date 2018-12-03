import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export class PwField extends React.Component {
    constructor() {
        super();
        this.state = {
            pwShow: false
        };
    }
    togglePwShow = () => {
        this.setState({
            pwShow: !this.state.pwShow
        });
    };
    render() {
        return (
            <div className="input-container">
                <FontAwesomeIcon icon="key"/>
                <input id="pwd-input" className="text-input pw-input" placeholder="Password" type={this.state.pwShow ? "text" : "password"} required/>
                <span onClick={this.togglePwShow} id="show-btn">
               <FontAwesomeIcon icon={this.state.pwShow ? "eye-slash" : "eye"}/>
           </span>
            </div>
        )
    }
}

export class EntryField extends React.Component {
    render() {
        return (
            <div className="input-container">
                <FontAwesomeIcon icon={this.props.faIcon}/>
                <input className="text-input" placeholder={this.props.placeHolder} required/>
            </div>
        )
    }
}
