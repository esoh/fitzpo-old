import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './FormInput.module.scss';

import { Tooltip } from '../popper';

class FormInput extends React.Component{

    state = {
        showHelper: false,
        rect: null,
    }

    hasHelper = !!this.props.helper

    // show helper on focus if helper exists
    onFocus = (e) => {
        if(this.hasHelper){
            // get the box of the input field
            var rect = e.currentTarget.getBoundingClientRect();
            // extract values given for every browser
            rect = {
                left: rect.left,
                top: rect.top,
                right: rect.right,
                bottom: rect.bottom,
            }

            this.setState({
                showHelper: true,
                rect,
            })
        }
    }

    // hide helper if helper exists
    onBlur = (e) => {
        if(this.hasHelper){
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
                {(this.hasHelper) ? (
                    <Tooltip
                        htmlFor={inputAttr.name}
                        visible={this.state.showHelper}
                        targetRect={this.state.rect}
                    >
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
