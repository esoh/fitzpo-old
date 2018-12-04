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
                    <input className={this.props.inputValid ? "text-input pw-input" : "text-input-invalid pw-input"} placeholder="Password"
                           value={this.props.inputValue}
                           id="pw-field"
                           type={this.state.pwShow ? "text" : "password"}
                           minLength={8}
                           pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                           onChange={this.props.inputChange}
                           onBlur={this.props.validateFunc}
                    />
                    <button type="button" onClick={this.togglePwShow} id="show-btn">
                       {/*<FontAwesomeIcon icon={this.state.pwShow ? "eye-slash" : "eye"}/>*/}
                        {this.state.pwShow ? "HIDE": "SHOW"}
                   </button>
                </div>
                <div className={this.props.inputValid ? "field-valid" : "field-invalid"}>Use 8 or more characters with a mix of letter, numbers & symbols</div>
            </div>
        )
    }
}

export class EntryField extends React.Component {
    constructor() {
        super();
        this.state = {
            userValue: ""
        };
    }

    handleChangeUser = event => {
        this.setState({userValue: event.target.value});
    };

    render() {
        return (
            <div className="container-margin">
                <div className="input-container">
                    <FontAwesomeIcon icon={this.props.faIcon}/>
                    <input className={this.props.inputValid ? "text-input" : "text-input-invalid"}
                           value={this.props.inputValue}
                           placeholder={this.props.placeHolder}
                           type={this.props.inputType}
                           pattern={this.props.inputPattern}
                           id={this.props.inputId}
                           onChange={this.props.inputChange}
                           onBlur={this.props.validateFunc}
                           required/>
                </div>
                <div className={this.props.inputValid ? "field-valid" : "field-invalid"}>{this.props.errorMsg}</div>
            </div>
        )
    }
}
