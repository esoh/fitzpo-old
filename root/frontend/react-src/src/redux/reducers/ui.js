import { SET_WINDOW_DIMS } from '../actionTypes';

const initialState = {
    windowWidth: 0,
    windowHeight: 0,
}

export default function(state=initialState, action) {
    switch(action.type) {
        case SET_WINDOW_DIMS:
            return {
                ...state,
                windowWidth: action.width,
                windowHeight: action.height,
            };
        default:
            return state;
    }
}
