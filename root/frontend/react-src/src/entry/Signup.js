import React from 'react';
import { Link, Redirect } from "react-router-dom";

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
        messages: [],
        redirect: false,
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    handleChange = (event) => {
        const field = event.target.name;
        const value = event.target.value;

        this.setState({
            formControls: {
                ...this.state.formControls,
                [field]: {
                    ...this.state.formControls[field],
                    value
                }
            }
        });
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
                                messages: result.error.invalid_params.map(param => param.name + ": " + param.reason)
                            });
                            break;
                        default:
                            this.setState({
                                messages: [result.error.title]
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

        var messages = this.state.messages.map(msg => <p key={msg}>{msg}</p>);

        return (
            <div className={styles.center}>
                <div className={styles.content}>
                    <div className={styles.entry}>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                Username:
                                <input name="username" type="text" value={this.state.formControls.username.value} onChange={this.handleChange} />
                            </label>
                            <label>
                                Email:
                                <input name="email" type="email" value={this.state.formControls.email.value} onChange={this.handleChange} />
                            </label>
                            <label>
                                Password:
                                <input name="password" type="password" value={this.state.formControls.password.value} onChange={this.handleChange} />
                            </label>
                            <input type="submit" value="Sign Up" />
                        </form>
                        {messages}
                        <div>
                            <Link to="/">Home</Link>
                            <Link to="/login">Log In</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signup;
