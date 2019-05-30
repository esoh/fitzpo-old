import React from 'react';
import { shallow } from 'enzyme';

import { Home } from './Home';
import GuestHome from './GuestHome';
import UserHome from './UserHome';

function setupWithLoginState(isLoggedIn){
    const props = {
        isLoggedIn,
    };

    const wrapper = shallow(<Home {...props}/>);

    return {
        props,
        wrapper
    };
}

describe('Home component', () => {
    it('should render neither guesthome nor userhome if login state has not been resolved', () => {
        const { wrapper } = setupWithLoginState(null);

        expect(wrapper.find(GuestHome).length).toBe(0);
        expect(wrapper.find(UserHome).length).toBe(0);
    });

    it('should render GuestHome when not logged in', () => {
        const { wrapper } = setupWithLoginState(false);

        expect(wrapper.find(GuestHome).length).toBe(1);
        expect(wrapper.find(UserHome).length).toBe(0);
    });

    it('should render neither guesthome nor userhome if login state has not been resolved', () => {
        const { wrapper } = setupWithLoginState(true);

        expect(wrapper.find(GuestHome).length).toBe(0);
        expect(wrapper.find(UserHome).length).toBe(1);
    });
})
