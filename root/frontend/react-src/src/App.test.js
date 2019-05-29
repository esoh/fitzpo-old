jest.mock('./services/authService');

import React from 'react';
import { shallow } from 'enzyme';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { App } from './App';
import Signup from './entry/Signup';
import Login from './entry/Login';
import Home from './home/Home';

import { checkLoggedIn } from './services/authService';

const setLoggedIn = jest.fn();

function setup(){
    const props = {
        setLoggedIn,
    };

    const wrapper = shallow(<App {...props}/>);

    return {
        props,
        wrapper
    }
}

describe('App component', () => {

    afterEach(() => {
        checkLoggedIn.mockClear();
        setLoggedIn.mockClear();
    })

    it('Should render router successfully', () => {
        checkLoggedIn.mockReturnValue(Promise.resolve());

        const { wrapper } = setup();

        expect(wrapper.find(Router).length).toBe(1);

        const pathMap = wrapper.find(Route).reduce((pathMap, route) => {
            pathMap[route.props().path] = route.props().component;
            return pathMap;
        }, {});

        expect(pathMap['/']).toBe(Home);
        expect(pathMap['/signup']).toBe(Signup);
        expect(pathMap['/login']).toBe(Login);
    })

    it('Should call mocked checkLoggedIn which returns a valid account then call setLoggedIn with param true', () => {
        const promise = Promise.resolve({ account: { username: 'test_username' } })
        checkLoggedIn.mockReturnValue(promise);

        expect(checkLoggedIn.mock.calls.length).toBe(0);
        expect(setLoggedIn.mock.calls.length).toBe(0);
        const { wrapper } = setup();
        expect(checkLoggedIn.mock.calls.length).toBe(1);

        return promise.then(() => {
            wrapper.update();
        }).then(() => {
            expect(setLoggedIn.mock.calls.length).toBe(1);
            expect(setLoggedIn.mock.calls[0][0]).toBe(true);
        })
    })

    it('Should call mocked checkLoggedIn which returns an empty response to call setLoggedIn with param false', () => {
        const promise = Promise.resolve(null)
        checkLoggedIn.mockReturnValue(promise);

        expect(checkLoggedIn.mock.calls.length).toBe(0);
        expect(setLoggedIn.mock.calls.length).toBe(0);
        const { wrapper } = setup();
        expect(checkLoggedIn.mock.calls.length).toBe(1);

        return promise.then(() => {
            wrapper.update();
        }).then(() => {
            expect(setLoggedIn.mock.calls.length).toBe(1);
            expect(setLoggedIn.mock.calls[0][0]).toBe(false);
        })
    })
})
