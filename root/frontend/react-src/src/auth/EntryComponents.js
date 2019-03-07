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
                    <FontAwesomeIcon icon="key" className="input-icon"/>
                    <input className={!this.props.errorMsg ? "text-input pw-input" : "text-input invalid pw-input"} placeholder="Password"
                           value={this.props.inputValue}
                           id="pw-field"
                           type={this.state.pwShow ? "text" : "password"}
                           minLength={8}
                           onChange={this.props.inputChange}
                           onBlur={this.props.onBlur}
                           autoComplete={this.props.autoComplete}
                           onKeyPress={this.props.handleEnterSubmit}
                    />
                    <button type="button" onClick={this.togglePwShow} id="show-btn">
                        {this.state.pwShow ? "HIDE": "SHOW"}
                   </button>
                </div>
                <div className={!this.props.errorMsg ? "field-valid" : "field-invalid"}>{this.props.errorMsg}</div>
            </div>
        )
    }
}

export function EntryField(props) {
    return (
        <div className="form-group">
            <div className="input-container">
                <FontAwesomeIcon icon={props.faIcon} className="input-icon"/>
                <input className={!props.errorMsg ? "text-input" : "text-input invalid"}
                       value={props.inputValue}
                       placeholder={props.placeHolder}
                       type={props.inputType}
                       id={props.inputId}
                       onChange={props.inputChange}
                       onBlur={props.onBlur}
                       autoComplete={props.autoComplete}
                       onKeyPress={props.handleEnterSubmit}
                       ref={props.setRef}
                       required
                />
            </div>
            <div className={!props.errorMsg ? "field-valid" : "field-invalid"}>{props.errorMsg}</div>
        </div>
    )
}
