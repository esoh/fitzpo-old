import { LOG_IN, LOG_OUT } from '../constants/actionTypes'
import AuthService from './AuthService'

const Auth = new AuthService();

const initialState = {
    loggedIn: Auth.loggedIn()
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case LOG_IN:
            console.log(state);
            return Object.assign({}, state, {
                loggedIn: true
            })
        case LOG_OUT:
            return Object.assign({}, state, {
                loggedIn: false
            })
        default:
            return state
    }
}
