import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';

import { Navbar } from './Navbar';
import Icon from './Icon';
import GuestNavContent from './GuestNavContent';
import UserNavContent from './UserNavContent';

describe('Navbar Component', () => {
    it('Should render icon and link', () => {
        const wrapper = shallow(<Navbar />);

        expect(wrapper.find(Link).findWhere(link => link.props()['to'] === '/').length).toBe(1);
        expect(wrapper.find(Icon).length).toBe(1);
    })

    it('Should render guest content if not logged in', () => {
        const wrapper = shallow(<Navbar isLoggedIn={false}/>);

        expect(wrapper.find(GuestNavContent).length).toBe(1);
        expect(wrapper.find(UserNavContent).length).toBe(0);
    })

    it('Should render guest content if not logged in', () => {
        const wrapper = shallow(<Navbar isLoggedIn={true}/>);

        expect(wrapper.find(UserNavContent).length).toBe(1);
        expect(wrapper.find(GuestNavContent).length).toBe(0);
    })

    it('Should render no content if login is not resolved', () => {
        const wrapper = shallow(<Navbar isLoggedIn={null}/>);

        expect(wrapper.find(UserNavContent).length).toBe(0);
        expect(wrapper.find(GuestNavContent).length).toBe(0);
    })
})
