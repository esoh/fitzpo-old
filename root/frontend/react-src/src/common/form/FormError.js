import React from 'react';
import PropTypes from 'prop-types';

function FormError(props){

    let {
        errors,
        ...attributes
    } = props;

    var errorMessages = errors.map(msg => <p key={msg}>{msg}</p>);

    if(!errors.length) return null;

    return (
        <div {...attributes}>
            {errorMessages}
        </div>
    )
}

FormError.propTypes = {
    errors: PropTypes.array,
}

export default FormError;
