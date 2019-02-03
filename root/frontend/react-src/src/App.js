import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye, faEyeSlash, faUser, faKey, faEnvelope, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'

import './App.css'
import { Login, Signup } from './auth/Entry'
import ModalContainer from './common/modal/ModalContainer'
import AppContainer from './AppContainer'

library.add(faEye, faEyeSlash, faUser, faKey, faEnvelope, faTimesCircle, faTrash)

class App extends Component {
    render() {
        return (
            <Router className="App">
                <div className="app-container">
                    <Switch>
                        <Route path="/login" component={Login}/>
                        <Route path="/signup" component={Signup}/>
                        <Route component={AppContainer}/>
                    </Switch>
                    <ModalContainer />
                </div>
            </Router>
        );
    }
}

export default App;
