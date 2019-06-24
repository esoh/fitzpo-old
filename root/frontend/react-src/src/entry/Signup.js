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
            username: { value: '' },
            email: { value: '' },
            password: { value: '' }
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
        this.signup();
    }

    signup = () => {
        registerAccount(this.state.formControls.username.value,
                        this.state.formControls.email.value,
                        this.state.formControls.password.value)
            .then(result => {
                if(result && result.error){
                    switch(result.error.code){
                        case 1004:
                            this.setState({
                                errorMessages: result.error.invalid_params.map(param => param.name + ": " + param.reason)
                            });
                            break;
                        default:
                            this.setState({
                                errorMessages: [result.error.title]
                            })
                    }
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
                                />
                                <FormInput
                                    label="Email:"
                                    name="email"
                                    type="email"
                                    value={this.state.formControls.email.value}
                                    onChange={this.handleChangeFor('email')}
                                    autoComplete="email"
                                />
                                <FormInput
                                    label="Password:"
                                    name="password"
                                    type="password"
                                    value={this.state.formControls.password.value}
                                    onChange={this.handleChangeFor('password')}
                                    autoComplete="new-password"
                                />
                            </div>
                            <FormError className={styles.formError} errors={this.state.errorMessages}/>
                            <div className={styles.footer}>
                                <input type="submit" value="Sign Up" />
                                <Link to="/login">Log In</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signup;
