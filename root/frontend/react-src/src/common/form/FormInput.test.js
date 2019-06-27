import React from 'react';
import { shallow, mount } from 'enzyme';

import FormInput from './FormInput';

var props = {
    label: 'testlabel',
    errorMessages: ['error1', 'error2'],
    helper: ['testhelper'],

    name: 'testname',
    type: 'testtype',
    onChange: jest.fn(),
    autoComplete: 'testautocomplete',
}

describe('FormInput component', () => {

    it('Should render fields', () => {
        let wrapper = shallow(<FormInput {...props}/>);
        expect(wrapper.find('label').length).toBe(1);

        let label = wrapper.find('label').at(0);
        expect(label.props().children).toContainEqual(props.label);
        //TODO: test for errorMessages and helper text

        expect(wrapper.find('input').length).toBe(1);
        let inputProps = wrapper.find('input').at(0).props();
        expect(inputProps.name).toEqual(props.name);
        expect(inputProps.type).toEqual(props.type);
        expect(inputProps.value).toEqual(props.value);
        expect(inputProps.onChange).toEqual(props.onChange);
        expect(inputProps.autoComplete).toEqual(props.autoComplete);
    })

    it('Should trigger onChange', () => {
        let wrapper = mount(<FormInput {...props}/>);
        let field = wrapper.find('input').at(0);

        expect(props.onChange.mock.calls.length).toBe(0);
        field.simulate('change');
        expect(props.onChange.mock.calls.length).toBe(1);
    })
})
