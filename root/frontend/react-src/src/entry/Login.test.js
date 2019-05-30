import React from 'react';
import { shallow, mount } from 'enzyme';
jest.unmock('react-router-dom');
import { Link, Redirect, BrowserRouter } from 'react-router-dom';

import { Login } from './Login';
jest.mock('../services/authService');
import { authenticateUser } from '../services/authService';

const setLoggedIn = jest.fn();

function setup(){
    const props = {
        setLoggedIn,
    };
    const wrapper = shallow(<Login {...props}/>);
    return {
        props,
        wrapper,
    }
}

describe('Login component', () => {

    afterEach(() => {
        authenticateUser.mockClear();
        setLoggedIn.mockClear();
    })

    it('Should have username and password fields', () => {
        const { wrapper } = setup();

        expect(wrapper.findWhere(elem => elem.type() == 'input' && elem.prop('name') == 'username').length).toBe(1);
        expect(wrapper.findWhere(elem => elem.type() == 'input' && elem.prop('name') == 'password').length).toBe(1);
        expect(wrapper.findWhere(elem => elem.type() == 'input' && elem.prop('type') == 'submit').length).toBe(1);
    })

    it('Should have links to signup and home', () => {
        const { wrapper } = setup();

        expect(wrapper.find(Link).findWhere(link => link.props()['to'] === '/').length).toBe(1);
        expect(wrapper.find(Link).findWhere(link => link.props()['to'] === '/signup').length).toBe(1);
    });

    it('Should update state when username/password input is set', () => {
        const props = {
            setLoggedIn,
        };

        var wrapper = mount(
            <BrowserRouter>
                <Login {...props}/>
            </BrowserRouter>
        );

        wrapper = wrapper.find(Login);

        const usernameField = wrapper.findWhere(elem => elem.type() == 'input' && elem.prop('name') == 'username').at(0);
        const passwordField= wrapper.findWhere(elem => elem.type() == 'input' && elem.prop('name') == 'password').at(0);

        expect(wrapper.state().formControls.username.value).toEqual('');
        expect(wrapper.state().formControls.password.value).toEqual('');

        usernameField.getDOMNode().value = 'test_username';
        usernameField.simulate('change');
        passwordField.getDOMNode().value = 'test_password';
        passwordField.simulate('change');

        expect(wrapper.state().formControls.username.value).toEqual('test_username');
        expect(wrapper.state().formControls.password.value).toEqual('test_password');
    });

    it('Should call authenticateUser using values from state', () => {
        var state = {
            formControls: {
                username: { value: 'tusername' },
                password: { value: 'tpassword' }
            }
        }

        const { wrapper } = setup();
        wrapper.setState(state);
        expect(wrapper.state().formControls.username.value).toEqual('tusername');

        const promise = Promise.resolve({});

        authenticateUser.mockReturnValue(promise);
        expect(authenticateUser.mock.calls.length).toBe(0);

        wrapper.find('form').at(0).simulate('submit', { preventDefault() {} });

        return promise.then(() => {
            wrapper.update();
        }).then(() => {
            expect(authenticateUser.mock.calls.length).toBe(1);
            expect(authenticateUser.mock.calls[0][0]).toBe('tusername');
            expect(authenticateUser.mock.calls[0][1]).toBe('tpassword');
        });
    });

    it('if authenticateUser returns a valid account, call redirect', () => {
        const promise = Promise.resolve({ username: 'username' });
        authenticateUser.mockReturnValue(promise);

        const { wrapper } = setup();

        wrapper.find('form').at(0).simulate('submit', { preventDefault() {} });
        expect(wrapper.find(Redirect).length).toBe(0);
        expect(wrapper.find('form').length).toBe(1);
        expect(setLoggedIn.mock.calls.length).toBe(0);

        return promise.then(() => {
            wrapper.update();
        }).then(() => {
            expect(wrapper.find(Redirect).length).toBe(1);
            expect(wrapper.find('form').length).toBe(0);
            expect(setLoggedIn.mock.calls.length).toBe(1);
            expect(setLoggedIn.mock.calls[0][0]).toBe(true);
        })
    });

    it("if authenticateUser returns an error, don't call redirect", () => {
        const promise = Promise.resolve({ error: { title: 'testerror' } });
        authenticateUser.mockReturnValue(promise);

        const { wrapper } = setup();

        wrapper.find('form').at(0).simulate('submit', { preventDefault() {} });
        expect(wrapper.find(Redirect).length).toBe(0);
        expect(wrapper.find('form').length).toBe(1);
        expect(setLoggedIn.mock.calls.length).toBe(0);

        return promise.then(() => {
            wrapper.update();
        }).then(() => {
            expect(wrapper.find(Redirect).length).toBe(0);
            expect(wrapper.find('form').length).toBe(1);
            expect(wrapper.state().messages).toEqual(['testerror']);
            expect(setLoggedIn.mock.calls.length).toBe(0);
        })
    });
})
