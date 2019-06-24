import React from 'react';
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { FormInput } from '../common/form';
import { authenticateUser } from '../services/authService';
import { setLoggedIn } from '../redux/actions';
import styles from './Entry.module.scss';

export class Login extends React.Component {

    abortController = new window.AbortController();

    state = {
        formControls: {
            username: { value: '' },
            password: { value: '' }
        },
        messages: [],
        redirect: false,
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    // given a field, returns a function to have this state value listen for
    // changes
    handleChangeFor = (field) => (event) => {
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
        this.login();
    }

    login = () => {
        authenticateUser(this.state.formControls.username.value,
                         this.state.formControls.password.value)
            .then(result => {
                console.log(result)
                if(result && result.error){
                    this.setState({
                        messages: [result.error.title]
                    })
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

        var messages = this.state.messages.map(msg => <p key={msg}>{msg}</p>);

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
                                />
                                <FormInput
                                    label="Password:"
                                    name="password"
                                    type="password"
                                    value={this.state.formControls.password.value}
                                    onChange={this.handleChangeFor('password')}
                                    autoComplete="current-password"
                                />
                            </div>
                            <div className={styles.footer}>
                                <input type="submit" value="Login" />
                                <Link to="/signup">Sign Up</Link>
                            </div>
                        </form>
                        {messages}
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
