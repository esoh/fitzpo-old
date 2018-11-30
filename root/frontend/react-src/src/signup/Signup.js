import React from 'react';
import './Signup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {PwField, EntryField} from "../common/EntryComponents";
import { Link } from 'react-router-dom';

class Signup extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }

    render() {
        return (
            <div className="wrapper">
                <div className="signup-container">
                    <h3>Sign up</h3>
                    <hr className="hrb"/>
                    <form>
                        <EntryField faIcon="user" placeHolder="Username"/>
                        <EntryField faIcon="envelope" placeHolder="Email"/>
                        <PwField/>
                        <button type="submit">Sign up</button>
                        <span>
                            Already have an account?
                            <Link className="sign-up" to="/login">Log in</Link>
                        </span>
                    </form>
                    <img src="https://i.pinimg.com/originals/85/ea/31/85ea31224d827b44e2fd1be7d4d00f9f.png" alt="runners"/>
                </div>
            </div>
        );
    }
}


export default Signup;
