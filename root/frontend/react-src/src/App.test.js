import React from 'react';
import { shallow } from 'enzyme';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { App } from './App';
import Signup from './entry/Signup';
import Login from './entry/Login';
import Home from './home/Home';

function setup(){
    const props = {
        setLoggedIn: jest.fn()
    };

    const wrapper = shallow(<App {...props}/>);

    return {
        props,
        wrapper
    }
}

describe('App component', () => {
    it('Should render router successfully', () => {
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
})
