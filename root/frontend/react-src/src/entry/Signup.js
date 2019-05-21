import React from 'react';
import { Link, Redirect } from "react-router-dom";

import { registerAccount } from '../services/authService';
import './Entry.css';

// TODO: Add verify password field
// TODO: center fields in middle of page
// TODO: display error if response fails

class Signup extends React.Component {

    state = {
        formControls: {
            username: { value: '' },
            email: { value: '' },
            password: { value: '' }
        },
        msg: '',
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
        this.signup();
    }

    signup = () => {
        registerAccount(this.state.formControls.username.value,
                        this.state.formControls.email.value,
                        this.state.formControls.password.value)
            .then(result => {
                if(result.error){
                    this.setState({ msg: result.error.title })
                } else {
                    alert("User registered!")
                    this.setState({ redirect: true })
                }
                // do stuff with the data here, like error checking
            })
            .catch(err => console.error(err))
    }

    render() {

        if (this.state.redirect) return <Redirect to='/' />;

        return (
            <div className="entry">
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
                <p>{this.state.msg}</p>
                <div>
                    <Link to="/">Home</Link>
                    <Link to="/login">Log In</Link>
                </div>
            </div>
        )
    }
}

export default Signup;
