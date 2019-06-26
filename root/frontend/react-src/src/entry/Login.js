import React from 'react';
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { FormInput, FormError } from '../common/form';
import { authenticateUser } from '../services/authService';
import { setLoggedIn } from '../redux/actions';
import styles from './Entry.module.scss';

export class Login extends React.Component {

    abortController = new window.AbortController();

    state = {
        formControls: {
            username: {
                value: '',
            },
            password: {
                value: '',
            }
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
        this.login();
    }

    _clearErrors = () => {
        this.setState({
            errorMessages: [],
            errorlinks: new Set(),
        });
    }

    login = () => {
        authenticateUser(this.state.formControls.username.value,
                         this.state.formControls.password.value)
            .then(result => {
                if(result && result.error){
                    switch (result.error.code){
                        case 1003:
                            this._clearErrors();

                            this.setState(({
                                errorMessages: ['The username or password you\'ve entered is incorrect.', 'Please try again.'],
                                errorlinks: new Set([['username', 'password']]),
                            }));
                            break;
                        default:
                            this.setState({
                                errorMessages: [result.error.title]
                            })
                    }
                } else {
                    alert("User authenticated!")
                    this.props.setLoggedIn(true)
                    this.setState({ redirect: true })
                }
                // do stuff with the data here, like error checking
            })
            .catch(err => {
                if (err.name === 'AbortError') return;
                console.error(err)
            })
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

    render() {

        if (this.state.redirect) return <Redirect to='/' />;

        var fieldErrors = this.getFieldErrorState();

        return (
            <div className={styles.center}>
                <div className={styles.content}>
                    <div className={styles.entry}>
                        <form onSubmit={this.handleSubmit} className={styles.form}>
                            <div className={styles.header}>
                                <h1>Log In</h1>
                            </div>
                            <div className={styles.body}>
                                <FormInput
                                    label="Username:"
                                    name="username"
                                    type="text"
                                    value={this.state.formControls.username.value}
                                    onChange={this.handleChangeFor('username')}
                                    autoComplete="username"
                                    errorClassName={styles.error}
                                    isError={!!fieldErrors.username}
                                />
                                <FormInput
                                    label="Password:"
                                    name="password"
                                    type="password"
                                    value={this.state.formControls.password.value}
                                    onChange={this.handleChangeFor('password')}
                                    autoComplete="current-password"
                                    errorClassName={styles.error}
                                    isError={!!fieldErrors.password}
                                />
                            </div>
                            <FormError className={styles.formError} errors={this.state.errorMessages}/>
                            <div className={styles.footer}>
                                <input type="submit" value="Login" />
                                <span className={styles.altEntry}>
                                    Don't have an account?
                                    <Link to="/signup">Sign Up</Link>
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    setLoggedIn: PropTypes.func.isRequired,
}

export default connect(
    null,
    { setLoggedIn }
)(Login)
