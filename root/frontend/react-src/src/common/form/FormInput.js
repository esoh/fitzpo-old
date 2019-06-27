import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './FormInput.module.scss';

import { Tooltip } from '../popper';

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
            isError,
            ...inputAttr
        } = this.props;

        var errorMessages;
        if(errors) errorMessages = errors.map(msg => <p className={styles.error} key={msg}>{msg}</p>);

        var inputClassObj = {};
        inputClassObj[styles.input] = true;
        inputClassObj[styles.error] = isError;

        return (
            <label className={styles.label}>
                {label}
                <input
                    id={inputAttr.name}
                    {...inputAttr}
                    className={classNames(inputClassObj)}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                />
                {(this.state.showHelper) ? (
                    <Tooltip htmlFor={inputAttr.name}>
                        {helper.map(msg => (<p key={msg}>{msg}</p>))}
                    </Tooltip>
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

    // below are input tag attributes
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    autoComplete: PropTypes.string,
}

export default FormInput;
