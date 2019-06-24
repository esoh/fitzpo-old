import React from 'react';
import { shallow, mount } from 'enzyme';
jest.unmock('react-router-dom');
import { Link, Redirect, BrowserRouter } from 'react-router-dom';

jest.mock('../services/authService');
import { registerAccount } from '../services/authService';
import Signup from './Signup';
import { FormInput } from '../common/form';

describe('Signup component', () => {

    it('Should have username, email, and password fields', () => {
        const wrapper = shallow(<Signup />);

        expect(wrapper.findWhere(elem => elem.type() == FormInput && elem.prop('name') == 'username').length).toBe(1);
        expect(wrapper.findWhere(elem => elem.type() == FormInput && elem.prop('name') == 'email').length).toBe(1);
        expect(wrapper.findWhere(elem => elem.type() == FormInput && elem.prop('name') == 'password').length).toBe(1);
        expect(wrapper.findWhere(elem => elem.type() == 'input' && elem.prop('type') == 'submit').length).toBe(1);
    });

    it('Should have link to login', () => {
        const wrapper = shallow(<Signup />);

        expect(wrapper.find(Link).findWhere(link => link.props()['to'] === '/login').length).toBe(1);
    });

    it('Should update state when username/email/password input is set', () => {
        var wrapper = mount(
            <BrowserRouter>
                <Signup />
            </BrowserRouter>
        );

        wrapper = wrapper.find(Signup);

        const usernameField = wrapper.findWhere(elem => elem.type() == 'input' && elem.prop('name') == 'username').at(0);
        const emailField = wrapper.findWhere(elem => elem.type() == 'input' && elem.prop('name') == 'email').at(0);
        const passwordField= wrapper.findWhere(elem => elem.type() == 'input' && elem.prop('name') == 'password').at(0);

        expect(wrapper.state().formControls.username.value).toEqual('');
        expect(wrapper.state().formControls.email.value).toEqual('');
        expect(wrapper.state().formControls.password.value).toEqual('');

        usernameField.getDOMNode().value = 'test_username';
        usernameField.simulate('change');
        emailField.getDOMNode().value = 'test_email';
        emailField.simulate('change');
        passwordField.getDOMNode().value = 'test_password';
        passwordField.simulate('change');

        expect(wrapper.state().formControls.username.value).toEqual('test_username');
        expect(wrapper.state().formControls.email.value).toEqual('test_email');
        expect(wrapper.state().formControls.password.value).toEqual('test_password');
    });

    it('Should call registerAccount with the inputs specified', () => {

        var state = {
            formControls: {
                username: { value: 'tusername' },
                email: { value: 'temail' },
                password: { value: 'tpassword' }
            }
        }

        const wrapper = shallow(<Signup />);
        wrapper.setState(state);
        expect(wrapper.state().formControls.username.value).toEqual('tusername');

        const promise = Promise.resolve({});

        registerAccount.mockReturnValue(promise);
        expect(registerAccount.mock.calls.length).toBe(0);

        wrapper.find('form').at(0).simulate('submit', { preventDefault() {} });

        return promise.then(() => {
            wrapper.update();
        }).then(() => {
            expect(registerAccount.mock.calls.length).toBe(1);
            expect(registerAccount.mock.calls[0][0]).toBe('tusername');
            expect(registerAccount.mock.calls[0][1]).toBe('temail');
            expect(registerAccount.mock.calls[0][2]).toBe('tpassword');
        });
    });

    it('if registerAccount returns a valid account, call redirect', () => {
        const promise = Promise.resolve({ user: { username: 'username' } });
        registerAccount.mockReturnValue(promise);

        const wrapper = shallow(<Signup />);

        wrapper.find('form').at(0).simulate('submit', { preventDefault() {} });
        expect(wrapper.find(Redirect).length).toBe(0);
        expect(wrapper.find('form').length).toBe(1);

        return promise.then(() => {
            wrapper.update();
        }).then(() => {
            expect(wrapper.find(Redirect).length).toBe(1);
            expect(wrapper.find('form').length).toBe(0);
        })
    });

    it("if registerAccount returns an error, don't call redirect", () => {
        const promise = Promise.resolve({ error: { title: 'testerror' } });
        registerAccount.mockReturnValue(promise);

        const wrapper = shallow(<Signup />);

        wrapper.find('form').at(0).simulate('submit', { preventDefault() {} });
        expect(wrapper.find(Redirect).length).toBe(0);
        expect(wrapper.find('form').length).toBe(1);

        return promise.then(() => {
            wrapper.update();
        }).then(() => {
            expect(wrapper.find(Redirect).length).toBe(0);
            expect(wrapper.find('form').length).toBe(1);
            expect(wrapper.state().messages).toEqual(['testerror'])
        })
    });
});
