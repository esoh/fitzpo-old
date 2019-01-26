import React from 'react'
import { Route, Switch, Redirect } from "react-router-dom"

import Navbar from './common/navbar/Navbar'
import Home from './home/Home'
import Programs from './programs/Programs'
import Exercises from './exercises/Exercises'
import Profile from './profile/Profile'
import Password from './auth/Password'

function AppContainer(props){
    return (
        <div className="nav-container">
            <Navbar location={props.location}/>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/programs" component={Programs}/>
                <Route path="/exercises" component={Exercises}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/password" component={Password}/>
                <Route path="*" render={() => <Redirect to="/"/>}/>
            </Switch>
        </div>
    )
}

export default AppContainer
