import reducer from '../../redux/reducers';
import * as types from '../../redux/actionTypes';

describe('auth reducer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {}).auth).toEqual({
            isLoggedIn: null,
        })
    })

    it('should set isLoggedIn', () => {
        var isLoggedIn = true;
        expect(reducer(undefined, {
            type: types.SET_LOGGED_IN,
            isLoggedIn
        }).auth).toEqual({
            isLoggedIn
        })

        isLoggedIn = false;
        expect(reducer(undefined, {
            type: types.SET_LOGGED_IN,
            isLoggedIn
        }).auth).toEqual({
            isLoggedIn
        })
    })
})

