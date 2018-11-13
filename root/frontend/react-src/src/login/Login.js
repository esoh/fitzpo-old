import React from 'react';

class Login extends React.Component {
    render() {
        return (
            <form>
                <div className="form-group">
                    <label>
                        <input type="text" name="name" placeholder="Email or username" />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        <input type="password" password="password" placeholder="Password"/>
                    </label>
                </div>
                <div className="form-check mb-2 mr-sm-2 mb-sm-0">
                    <label className="form-check-label">
                        <input className="form-check-input" type="checkbox" />
                        Remember me
                    </label>
                </div>
                <a href="www.something.com">Forgot password?</a>
                <input className="btn btn-primary" type="submit" value="Log in" />
            </form>
        );
    }
}

export default Login;
