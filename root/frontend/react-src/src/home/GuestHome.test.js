import React from 'react';
import { Link } from "react-router-dom";
import { shallow } from 'enzyme';
import GuestHome from './GuestHome';

describe('GuestHome component', () => {
    it('should render a link to signup & login', () => {
        const wrapper = shallow(<GuestHome />)
        expect(wrapper.find(Link).findWhere(link => link.props()['to'] === '/signup').length).toBe(1);
        expect(wrapper.find(Link).findWhere(link => link.props()['to'] === '/login').length).toBe(1);
    })
    it('should render a welcome message', () => {
        const wrapper = shallow(<GuestHome />)
        expect(wrapper.findWhere(p => p.type() == 'p' && p.text().toLowerCase().includes('welcome')).length).toBe(1);
    })
})
