import React from 'react';
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Entry.css';
import { authenticateUser } from '../services/authService';
import { setLoggedIn } from '../redux/actions';

class Login extends React.Component {

    state = {
        formControls: {
            username: { value: '' },
            password: { value: '' }
        },
        messages: [],
        redirect: false,
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
        this.login();
    }

    login = () => {
        authenticateUser(this.state.formControls.username.value,
                         this.state.formControls.password.value)
            .then(result => {
                console.log(result)
                if(result.error){
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
            .catch(err => console.error(err))
    }

    render() {

        if (this.state.redirect) return <Redirect to='/' />;

        var messages = this.state.messages.map(msg => <p key={msg}>{msg}</p>);

        return (
            <div className="entry">
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username:
                        <input name="username" type="text" value={this.state.formControls.username.value} onChange={this.handleChange} />
                    </label>
                    <label>
                        Password:
                        <input name="password" type="password" value={this.state.formControls.password.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Login" />
                </form>
                {messages}
                <div>
                    <Link to="/">Home</Link>
                    <Link to="/signup">Sign Up</Link>
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
