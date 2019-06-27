import React from 'react';
import PropTypes from 'prop-types';

class FormInput extends React.Component{

    state = {
        showHelper: false,
    }

    onFocus = (e) => {
        if(this.props.helper !== undefined){
            this.setState({
                showHelper: true,
            })
        }
    }

    onBlur = (e) => {
        if(this.props.helper !== undefined){
            this.setState({
                showHelper: false,
            })
        }
    }

    render () {
        let {
            label,
            errorMessages: errors,
            helper,
            helperClassName, // only show helper if input on focus
            errorClassName,
            isError,
            ...inputAttr
        } = this.props;

        var errorMessages;
        if(errors) errorMessages = errors.map(msg => <p className={errorClassName} key={msg}>{msg}</p>);
        let inputClassName = isError ? errorClassName : '';

        return (
            <label>
                {label}
                <input id={inputAttr.name} {...inputAttr} className={inputClassName} onFocus={this.onFocus} onBlur={this.onBlur}/>
                {(this.state.showHelper) ? (
                    <div className={helperClassName} for={inputAttr.name}>
                        {helper.map(msg => (<p key={msg}>{msg}</p>))}
                    </div>
                ) : null}
                {errorMessages}
            </label>
        );
    }
}

FormInput.propTypes = {
    label: PropTypes.string.isRequired,
    errorMessages: PropTypes.array,
    helper: PropTypes.array,
    errorClassName: PropTypes.string,
    helperClassName: PropTypes.string,

    // below are input tag attributes
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    autoComplete: PropTypes.string,
}

export default FormInput;
