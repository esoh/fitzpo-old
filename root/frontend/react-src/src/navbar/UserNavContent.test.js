import React from 'react';
import { shallow } from 'enzyme';
import { NavLink } from 'react-router-dom';

import UserNavContent from './UserNavContent';

describe('UserNavContent component', () => {
    it('Should render links to signup and login', () => {
        const wrapper = shallow(<UserNavContent />);

        expect(wrapper.find(NavLink).findWhere(link => link.props()['to'] === '/exercise-logs').length).toBe(1);
    })
})
