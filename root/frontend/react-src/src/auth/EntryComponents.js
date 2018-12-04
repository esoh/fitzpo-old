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
            <div className="form-group">
                <div className="input-container">
                    <FontAwesomeIcon icon="key"/>
                    <input className={this.props.inputValid ? "text-input pw-input" : "text-input invalid pw-input"} placeholder="Password"
                           value={this.props.inputValue}
                           id="pw-field"
                           type={this.state.pwShow ? "text" : "password"}
                           minLength={8}
                           onChange={this.props.inputChange}
                           onBlur={this.props.inputValue!=="" ? this.props.validateFunc : false}
                    />
                    <button type="button" onClick={this.togglePwShow} id="show-btn">
                        {this.state.pwShow ? "HIDE": "SHOW"}
                   </button>
                </div>
                <div className={this.props.inputValid ? "field-valid" : "field-invalid"}>Use 8 or more characters with a mix of letter, numbers & symbols</div>
            </div>
        )
    }
}

export function EntryField(props) {
    return (
        <div className="form-group">
            <div className="input-container">
                <FontAwesomeIcon icon={props.faIcon}/>
                <input className={props.inputValid ? "text-input" : "text-input invalid"}
                       value={props.inputValue}
                       placeholder={props.placeHolder}
                       type={props.inputType}
                       id={props.inputId}
                        onChange={props.inputChange}
                       onBlur={props.inputValue!=="" ? props.validateFunc: false}
                       required/>
            </div>
            <div className={props.inputValid ? "field-valid" : "field-invalid"}>{props.errorMsg}</div>
        </div>
    )
}

