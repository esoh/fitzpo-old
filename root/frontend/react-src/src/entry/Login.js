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
                isError: false,
            },
            password: {
                value: '',
                isError: false,
            }
        },
        errorMessages: [],
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
            }
        }));
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.login();
    }

    login = () => {
        authenticateUser(this.state.formControls.username.value,
                         this.state.formControls.password.value)
            .then(result => {
                if(result && result.error){
                    switch (result.error.code){
                        case 1003:
                            this.setState(prevState => ({
                                formControls: {
                                    ...prevState.formControls,
                                    username: {
                                        ...prevState.formControls.username,
                                        isError: true,
                                    },
                                    password: {
                                        ...prevState.formControls.password,
                                        isError: true,
                                    }
                                },
                                errorMessages: ['The username or password you\'ve entered is incorrect.', 'Please try again.']
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

    render() {

        if (this.state.redirect) return <Redirect to='/' />;

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
                                    isError={this.state.formControls.username.isError}
                                />
                                <FormInput
                                    label="Password:"
                                    name="password"
                                    type="password"
                                    value={this.state.formControls.password.value}
                                    onChange={this.handleChangeFor('password')}
                                    autoComplete="current-password"
                                    errorClassName={styles.error}
                                    isError={this.state.formControls.password.isError}
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
