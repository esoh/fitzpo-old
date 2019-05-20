import React from 'react';
import { Link, Redirect } from "react-router-dom";
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
        fetch('/accounts', {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                username: this.state.formControls.username.value,
                email: this.state.formControls.email.value,
                password: this.state.formControls.password.value,
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.error){
                    this.setState({ msg: data.error.title })
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
                <Link to="/">Home</Link>
            </div>
        )
    }
}

export default Signup;
