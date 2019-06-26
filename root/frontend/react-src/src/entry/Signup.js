import React from 'react';
import { Link, Redirect } from "react-router-dom";

import { FormInput, FormError } from '../common/form';
import { registerAccount } from '../services/authService';
import styles from './Entry.module.scss';

// TODO: Add verify password field

class Signup extends React.Component {

    abortController = new window.AbortController();

    state = {
        formControls: {
            username: {
                value: '',
                errorMessages: [],
            },
            email: {
                value: '',
                errorMessages: [],
            },
            password: {
                value: '',
                errorMessages: [],
            },
        },
        errorMessages: [],
        errorlinks: new Set(),
        redirect: false,
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    // given a field, returns a function to have this state value listen for
    // changes
    handleChangeFor = (field) => (event) => {
        const value = event.target.value;

        this.setState(prevState => ({
            formControls: {
                ...prevState.formControls,
                [field]: {
                    ...prevState.formControls[field],
                    value
                }
            },
            errorlinks: this._getNewErrorLinksFromChange(field, prevState),
        }));
    }

    _getNewErrorLinksFromChange = (inputField, prevState) => {
        var errorlinks = [];
        prevState.errorlinks.forEach(link => {
            if(!link.includes(inputField)){
                errorlinks.push(link);
            }
        })
        return errorlinks;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.signup();
    }

    errorCodeAndParamToStr = {
        'CustomValidatorError': {
            username: ['Username may only contain numbers, letters, and the characters "-" and "_".'],
            password: ['Password should contain at least one letter, one number, and one special character (@$.!%*#?&), and must at least be 8 characters long.'],
        },
        'EmailValidatorError': {
            email: ['Email must be of the format "johndoe@example.com".'],
        },
        'UniqueValidatorError': {
            usernameOrEmail: ['The username or email you\'ve entered is already in use.', 'Please try another username or email.'],
        },
        'NotNullValidatorError': {
            username: ['Username is required.'],
            email: ['Email is required.'],
            password: ['Password is required.'],
        },
        'ProfanityValidatorError': {
            username: ['Username contains an inappropriate word. Please try another.']
        }
    }

    paramStrings = {
        usernameOrEmail: ['username', 'email'],
    }

    helpers = {
        username: ['Username should only contain letters, numbers, and the characters "-" and "_".'],
        email: ['Email must be of the format: johndoe@email.com'],
        password: ['Password must: ', '\u00b7 have at least one number', '\u00b7 have at least one letter', '\u00b7 have at least one special character (@$.!%*#?&)', '\u00b7 be at least 8 characters long'],
    }

    // used for error clearing.
    // e.g. usernameOrEmail wrong means that correcting either username or email
    // will clear both errors
    _getLinkedParams = (paramStr) => {
        // if can't find param string in form controls then try to find params
        // in this.paramStrings
        if(this.state.formControls[paramStr] === undefined){
            // can't find parameters!
            if(this.paramStrings[paramStr] === undefined){
                throw new Error("Unhanlded parameter error string: " + paramStr);
            }

            return this.paramStrings[paramStr];
        } else {
        // else if it's in form control that means it's just one parameter
            return [paramStr];
        }
    }

    _clearErrors = () => {
        this.setState(prevState => ({
            formControls: {
                ...prevState.formControls,
                username: {
                    ...prevState.formControls.username,
                    errorMessages: [],
                },
                email: {
                    ...prevState.formControls.email,
                    errorMessages: [],
                },
                password: {
                    ...prevState.formControls.password,
                    errorMessages: [],
                },
            },
            errorMessages: [],
            errorlinks: new Set(),
        }));
    }

    setStateErrorMessages = (error) => {
        var newState = {};

        switch(error.code) {
            // invalid parameters
            case 1004:
                this._clearErrors();

                newState.errorlinks = new Set();
                newState.formControls = {};

                var modifiedParams = new Set();

                // for each invalid parameter error:
                error.invalid_params.forEach(param => {

                    // get client error message
                    var errorMessages = [param.name + ': ' + param.reason];
                    if(this.errorCodeAndParamToStr[param.error] && this.errorCodeAndParamToStr[param.error][param.name]){
                        errorMessages = this.errorCodeAndParamToStr[param.error][param.name];
                    }

                    // set errorMessages

                    // edge case: param not in formControl
                    if(this.state.formControls[param.name] === undefined){
                        newState.errorMessages = errorMessages;

                    } else {
                        newState.formControls[param.name] = {
                            errorMessages: errorMessages
                        }
                        modifiedParams.add(param.name);
                    }

                    // set error links
                    newState.errorlinks.add(this._getLinkedParams(param.name));
                });


                this.setState(prevState => {
                    modifiedParams.forEach(paramName => {
                        Object.assign(prevState.formControls[paramName], newState.formControls[paramName]);
                    });

                    return {
                        ...prevState,
                        ...newState,
                        formControls: {
                            ...prevState.formControls
                        }
                    };
                });

                break;
            default:
                this.setState({
                    errorMessages: [error.title]
                });
        }
    }

    getFieldErrorState = () => {
        var fieldErrors = {};

        this.state.errorlinks.forEach(errorlist => {
            errorlist.forEach(param => {
                fieldErrors[param] = true;
            })
        })

        return fieldErrors;
    }

    signup = () => {
        registerAccount(this.state.formControls.username.value,
                        this.state.formControls.email.value,
                        this.state.formControls.password.value)
            .then(result => {
                if(result && result.error){
                    this.setStateErrorMessages(result.error);
                } else {
                    alert("User registered!")
                    console.log(result)
                    this.setState({ redirect: true })
                }
                // do stuff with the data here, like error checking
            })
            .catch(err => {
                if (err.name === 'AbortError') return;
                console.error(err)
            })
    }

    render() {

        if (this.state.redirect) return <Redirect to='/' />;

        var fieldErrors = this.getFieldErrorState();

        return (
            <div className={styles.center}>
                <div className={styles.content}>
                    <div className={styles.entry}>
                        <form onSubmit={this.handleSubmit} className={styles.form}>
                            <div className={styles.header}>
                                <h1>Sign Up</h1>
                            </div>
                            <div className={styles.body}>
                                <FormInput
                                    label="Username:"
                                    name="username"
                                    type="text"
                                    value={this.state.formControls.username.value}
                                    onChange={this.handleChangeFor('username')}
                                    autoComplete="username"
                                    isError={(!!fieldErrors.username)}
                                    errorMessages={this.state.formControls.username.errorMessages}
                                    errorClassName={styles.error}
                                    helper={this.helpers.username}
                                    helperClassName={styles.helper}
                                />
                                <FormInput
                                    label="Email:"
                                    name="email"
                                    type="email"
                                    value={this.state.formControls.email.value}
                                    onChange={this.handleChangeFor('email')}
                                    autoComplete="email"
                                    placeholder="name@example.com"
                                    isError={(!!fieldErrors.email)}
                                    errorMessages={this.state.formControls.email.errorMessages}
                                    errorClassName={styles.error}
                                    helper={this.helpers.email}
                                    helperClassName={styles.helper}
                                />
                                <FormInput
                                    label="Password:"
                                    name="password"
                                    type="password"
                                    value={this.state.formControls.password.value}
                                    onChange={this.handleChangeFor('password')}
                                    autoComplete="new-password"
                                    isError={(!!fieldErrors.password)}
                                    errorMessages={this.state.formControls.password.errorMessages}
                                    errorClassName={styles.error}
                                    helper={this.helpers.password}
                                    helperClassName={styles.helper}
                                />
                            </div>
                            <FormError className={styles.formError} errors={this.state.errorMessages}/>
                            <div className={styles.footer}>
                                <input type="submit" value="Sign Up" />
                                <span className={styles.altEntry}>
                                    Already have an account?
                                    <Link to="/login">Log In</Link>
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signup;
