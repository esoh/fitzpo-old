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
            <div className={"container-margin"}>
                <div className="input-container">
                    <FontAwesomeIcon icon="key"/>
                    <input className="text-input pw-input" placeholder="Password"
                           id="pw-field"
                           type={this.state.pwShow ? "text" : "password"}
                           minLength={8}
                           pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                           required/>
                    <button type="button" onClick={this.togglePwShow} id="show-btn">
                       {/*<FontAwesomeIcon icon={this.state.pwShow ? "eye-slash" : "eye"}/>*/}
                        {this.state.pwShow ? "HIDE": "SHOW"}
                   </button>
                </div>
                <div className={this.props.inputValid ? "field-valid" : "field-invalid"}>Passwords must be a least 8 characters long and be a mix of letter, digits & symbols</div>
            </div>
        )
    }
}

export class EntryField extends React.Component {
    render() {
        return (
            <div className="container-margin">
                <div className="input-container">
                    <FontAwesomeIcon icon={this.props.faIcon}/>
                    <input className="text-input" placeholder={this.props.placeHolder} type={this.props.inputType} pattern={this.props.inputPattern} id={this.props.inputId} required/>
                </div>
                <div className={this.props.inputValid ? "field-valid" : "field-invalid"}>{this.props.errorMsg}</div>
            </div>
        )
    }
}
