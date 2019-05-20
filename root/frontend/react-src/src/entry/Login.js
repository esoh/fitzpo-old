import React from 'react';
import { Link, Redirect } from "react-router-dom";
import './Entry.css';
import { authenticateUser } from '../services/authService';

// TODO: center fields in middle of page
// TODO: display error if response fails

class Login extends React.Component {

    state = {
        formControls: {
            username: { value: '' },
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
        this.login();
    }

    login = () => {
        authenticateUser(this.state.formControls.username.value,
                         this.state.formControls.password.value)
            .then(data => {
                console.log(data)
                if(data.error){
                    this.setState({ msg: data.error.title })
                } else {
                    alert("User authenticated!")
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
                        Password:
                        <input name="password" type="password" value={this.state.formControls.password.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Login" />
                </form>
                <p>{this.state.msg}</p>
                <div>
                    <Link to="/">Home</Link>
                    <Link to="/signup">Sign Up</Link>
                </div>
            </div>
        )
    }
}

export default Login;
