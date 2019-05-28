import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Signup from '../entry/Signup';
import Login from '../entry/Login';
import Home from '../home/Home';
import appReducer from '../redux/reducers';
import App from '../App';

function setupWithURL(url){
    const store = createStore(appReducer);
    const urls = [ url ];
    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter initialEntries={urls}>
                <App />
            </MemoryRouter>
        </Provider>
    );

    return {
        wrapper
    }
}

describe('App router', () => {
    it('Should mount no component', () => {
        const { wrapper } = setupWithURL('/asdf');
        expect(wrapper.find(Home).length).toBe(0);
        expect(wrapper.find(Signup).length).toBe(0);
        expect(wrapper.find(Login).length).toBe(0);
    });

    it('Should mount the Signup component', () => {
        const { wrapper } = setupWithURL('/signup');
        expect(wrapper.find(Home).length).toBe(0);
        expect(wrapper.find(Signup).length).toBe(1);
        expect(wrapper.find(Login).length).toBe(0);
    });

    it('Should mount the Login component', () => {
        const { wrapper } = setupWithURL('/login');
        expect(wrapper.find(Home).length).toBe(0);
        expect(wrapper.find(Signup).length).toBe(0);
        expect(wrapper.find(Login).length).toBe(1);
    });
});
