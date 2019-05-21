import { SET_LOGGED_IN } from '../actionTypes';

export const setLoggedIn = (isLoggedIn) => ({
    type: SET_LOGGED_IN,
    isLoggedIn,
});
