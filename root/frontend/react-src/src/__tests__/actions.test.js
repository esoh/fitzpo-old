import * as actions from '../redux/actions';
import * as types from '../redux/actionTypes';

describe('redux actions', () => {
    it('should create an action to set login state', () => {
        const isLoggedIn = true;
        const expectedAction = {
            type: types.SET_LOGGED_IN,
            isLoggedIn
        };
        expect(actions.setLoggedIn(isLoggedIn)).toEqual(expectedAction);
    });
});
