import React from 'react';
import { shallow } from 'enzyme';

import ExerciseLogCard from './ExerciseLogCard';

var props = {
    datetime: new Date(),
    type: 'testtype',
    exerciseName: 'testname',
    progress: 'testprogress',
    deleteLog: jest.fn(),
}

describe('Exercise Log Card Component', () => {
    it('Should render elements from props', () => {
        var wrapper = shallow(<ExerciseLogCard {...props}/>);

        expect(wrapper.findWhere(elem => elem.type() == 'span' && elem.props()['children'] == props.type).length).toBe(1);
        expect(wrapper.findWhere(elem => elem.type() == 'span' && elem.props()['children'] == props.exerciseName).length).toBe(1);
        expect(wrapper.findWhere(elem => elem.type() == 'span' && elem.props()['children'] == props.progress).length).toBe(1);
        expect(wrapper.findWhere(elem => elem.type() == 'button' && elem.props()['children'] == 'Delete').length).toBe(1);
    })

    it('Clicking the delete button should call the props function', () => {
        var wrapper = shallow(<ExerciseLogCard {...props}/>);

        expect(props.deleteLog.mock.calls.length).toBe(0);
        wrapper.findWhere(elem => elem.type() == 'button' && elem.props()['children'] == 'Delete').simulate('click');
        expect(props.deleteLog.mock.calls.length).toBe(1);
    })
})
