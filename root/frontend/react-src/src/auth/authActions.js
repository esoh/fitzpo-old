import { LOG_IN, LOG_OUT } from '../constants/actionTypes'

export function logIn() {
    return { type: LOG_IN }
}

export function logOut() {
    return { type: LOG_OUT }
}
