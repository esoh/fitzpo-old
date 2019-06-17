import React from 'react';
import { shallow } from 'enzyme';

import ExerciseLogCard from './ExerciseLogCard';

var props = {
    datetime: new Date(),
    type: 'testtype',
    exerciseName: 'testname',
    progress: 'testprogress',
}

describe('Exercise Log Card Component', () => {
    it('Should render elements from props', () => {
        var wrapper = shallow(<ExerciseLogCard {...props}/>);

        expect(wrapper.findWhere(elem => elem.type() == 'p' && elem.props()['children'] == props.datetime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})).length).toBe(1);
        expect(wrapper.findWhere(elem => elem.type() == 'span' && elem.props()['children'] == props.type).length).toBe(1);
        expect(wrapper.findWhere(elem => elem.type() == 'span' && elem.props()['children'] == props.exerciseName).length).toBe(1);
        expect(wrapper.findWhere(elem => elem.type() == 'span' && elem.props()['children'] == props.progress).length).toBe(1);
    })
})
