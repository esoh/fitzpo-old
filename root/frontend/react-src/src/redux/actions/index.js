import {
    SET_LOGGED_IN,
    SET_WINDOW_DIMS,
} from '../actionTypes';

export const setLoggedIn = (isLoggedIn) => ({
    type: SET_LOGGED_IN,
    isLoggedIn,
});

export const setWindowDims = (width, height) => ({
    type: SET_WINDOW_DIMS,
    width,
    height,
})
