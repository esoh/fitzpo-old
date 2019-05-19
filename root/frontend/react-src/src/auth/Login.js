import React from 'react';

// TODO: center fields in middle of page
// TODO: display error if response fails

class Login extends React.Component {

    state = {
        formControls: {
            username: { value: '' },
            password: { value: '' }
        }
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
        fetch('/auth/token-jwt', {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                username: this.state.formControls.username.value,
                password: this.state.formControls.password.value,
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                // do stuff with the data here, like error checking
            })
            .catch(err => console.error(err))
    }

    render() {
        return (
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
        )
    }
}

export default Login;
