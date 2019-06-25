import React from 'react';
import PropTypes from 'prop-types';

function FormInput(props){
    let {
        label,
        errorMessages: errors,
        helper,
        errorClassName,
        isError,
        ...inputAttr
    } = props;

    var errorMessages;
    if(errors) errorMessages = errors.map(msg => <p className={errorClassName} key={msg}>{msg}</p>);

    let styleClassName = isError ? errorClassName : '';

    return (
        <label>
            {label}
            <input {...inputAttr} className={styleClassName}/>
            {errorMessages}
        </label>
    )
}

FormInput.propTypes = {
    label: PropTypes.string.isRequired,
    errorMessages: PropTypes.array,
    helper: PropTypes.string,

    // below are input tag attributes
    name: PropTypes.string,
    type: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    autoComplete: PropTypes.string,
}

export default FormInput;
