jest.mock('../services/authService');
import React from 'react';
import { shallow } from 'enzyme';
import { Redirect, Link } from "react-router-dom";

import { UserHome } from './UserHome';
import {
    deauthenticateAccountLocally,
} from '../services/authService';

const setLoggedIn = jest.fn();

function setup(){
    const props = {
        setLoggedIn,
    };

    const wrapper = shallow(<UserHome {...props}/>);

    return {
        props,
        wrapper
    }
}

describe('UserHome component', () => {

    afterEach(() => {
        setLoggedIn.mockClear();
        deauthenticateAccountLocally.mockClear();
    })

    it('should render a logout button and a welcome message', () => {
        const { wrapper } = setup();
        expect(wrapper.findWhere(btn => btn.type() == 'button' && btn.text() === 'Log Out').length).toBe(1);

        expect(wrapper.findWhere(p => p.type() == 'p' && p.text().toLowerCase().includes('welcome')).length).toBe(1);
        expect(wrapper.find(Link).findWhere(link => link.props()['to'] === '/exercise-logs').length).toBe(1);
    })

    it('clicking the button should call deauthLocally and set setLoggedIn to false', () => {
        const deauth = Promise.resolve();
        deauthenticateAccountLocally.mockReturnValue(deauth);

        const { wrapper } = setup();
        expect(deauthenticateAccountLocally.mock.calls.length).toBe(0);
        expect(setLoggedIn.mock.calls.length).toBe(0);

        const btn = wrapper.findWhere(elem => elem.type() == 'button' && elem.text() === "Log Out");

        btn.simulate('click');
        expect(deauthenticateAccountLocally.mock.calls.length).toBe(1);

        return deauth.then(() => {
            wrapper.update();
        }).then(() => {
            expect(setLoggedIn.mock.calls.length).toBe(1);
            expect(setLoggedIn.mock.calls[0][0]).toBe(false);
        })
    })
})
