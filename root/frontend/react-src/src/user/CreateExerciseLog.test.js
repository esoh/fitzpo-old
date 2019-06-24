jest.mock('../services/userService');

import React from 'react';
import { shallow, mount } from 'enzyme';

import { FormInput } from '../common/form';
import CreateExerciseLog from './CreateExerciseLog';
import {
    getLocalHTMLDate,
    getLocalHTMLTime,
} from '../utils/utils';

import { createExerciseLog } from '../services/userService';

var updatePageExerciseLogs = jest.fn();
var logout = jest.fn();
var props = {
    logout,
    updatePageExerciseLogs,
};
function shallowSetup() {
    return shallow(<CreateExerciseLog {...props}/>);
}

var date = new Date();
date = new Date(date - date.getSeconds()*1000 - date.getMilliseconds());
const exerciseLog1 = {
    id:             1,
    date:           date,
    exerciseName:   'Bench Press',
    type:           '5x5',
    progress:       '5/5/5/5/5'
};

const noTokenErrorRes = {
    error: {
        code: 1008
    }
};


describe('CreateExerciseLog Component', () => {

    const wrapper = shallowSetup();

    describe('Initial render', () => {
        it('Should have exercise log input form', () => {
            expect(wrapper.findWhere(elem => elem.type() == FormInput && elem.prop('name') == 'exerciseName').length).toBe(1);
            expect(wrapper.findWhere(elem => elem.type() == FormInput && elem.prop('name') == 'type').length).toBe(1);
            expect(wrapper.findWhere(elem => elem.type() == FormInput && elem.prop('name') == 'progress').length).toBe(1);
            expect(wrapper.findWhere(elem => elem.type() == 'input' && elem.prop('type') == 'submit').length).toBe(1);
        })

        it('Should have functional more options button', () => {
            var btn = wrapper.findWhere(elem => elem.type() == 'button' && elem.prop('children') == 'More Options');
            expect(wrapper.findWhere(elem => elem.type() == 'button' && elem.prop('children') == 'Less Options').length).toBe(0);
            expect(btn.length).toBe(1);

            expect(wrapper.findWhere(elem => elem.type() == FormInput && elem.prop('name') == 'date').length).toBe(0);
            expect(wrapper.findWhere(elem => elem.type() == FormInput && elem.prop('name') == 'time').length).toBe(0);

            btn = btn.at(0);
            btn.simulate('click');
            var btn = wrapper.findWhere(elem => elem.type() == 'button' && elem.prop('children') == 'Less Options');
            expect(btn.length).toBe(1);
            expect(wrapper.findWhere(elem => elem.type() == 'button' && elem.prop('children') == 'More Options').length).toBe(0);

            expect(wrapper.findWhere(elem => elem.type() == FormInput && elem.prop('name') == 'date').length).toBe(1);
            expect(wrapper.findWhere(elem => elem.type() == FormInput && elem.prop('name') == 'time').length).toBe(1);

            btn = btn.at(0);
            btn.simulate('click');

            expect(wrapper.findWhere(elem => elem.type() == FormInput && elem.prop('name') == 'date').length).toBe(0);
            expect(wrapper.findWhere(elem => elem.type() == FormInput && elem.prop('name') == 'time').length).toBe(0);

            expect(wrapper.findWhere(elem => elem.type() == 'button' && elem.prop('children') == 'More Options').length).toBe(1);
            expect(wrapper.findWhere(elem => elem.type() == 'button' && elem.prop('children') == 'Less Options').length).toBe(0);

        })

        it('Date state value should be set to a valid date', () => {
            expect(isNaN(Date.parse(wrapper.state().formControls.date.value))).toBe(false);
        })
    })

    describe('Log exercise', () => {
        beforeEach(() => {
            updatePageExerciseLogs.mockClear();
            createExerciseLog.mockClear();
        })

        it('Form input fields should update their respective state values', () => {

            var wrapper = mount( <CreateExerciseLog {...props}/>);
            wrapper.findWhere(elem => elem.type() == 'button' && elem.prop('children') == 'More Options').simulate('click');

            const exerciseLogDate = wrapper.findWhere(elem => elem.type() == 'input' && elem.prop('name') == 'date').at(0);
            const exerciseLogTime = wrapper.findWhere(elem => elem.type() == 'input' && elem.prop('name') == 'time').at(0);
            const exerciseName = wrapper.findWhere(elem => elem.type() == 'input' && elem.prop('name') == 'exerciseName').at(0);
            const exerciseType = wrapper.findWhere(elem => elem.type() == 'input' && elem.prop('name') == 'type').at(0);
            const exerciseLogProgress = wrapper.findWhere(elem => elem.type() == 'input' && elem.prop('name') == 'progress').at(0);

            expect(isNaN(Date.parse(wrapper.state().formControls.date.value))).toBe(false);
            expect(wrapper.state().formControls.exerciseName.value).toEqual('');
            expect(wrapper.state().formControls.type.value).toEqual('');
            expect(wrapper.state().formControls.progress.value).toEqual('');

            const date = getLocalHTMLDate(exerciseLog1.date);
            const time = getLocalHTMLTime(exerciseLog1.date);

            exerciseLogDate.getDOMNode().value = date;
            exerciseLogDate.simulate('change');
            exerciseLogTime.getDOMNode().value = time;
            exerciseLogTime.simulate('change');
            exerciseName.getDOMNode().value = exerciseLog1.exerciseName;
            exerciseName.simulate('change');
            exerciseType.getDOMNode().value = exerciseLog1.type;
            exerciseType.simulate('change');
            exerciseLogProgress.getDOMNode().value = exerciseLog1.progress;
            exerciseLogProgress.simulate('change');

            expect(wrapper.state().formControls.date.value).toEqual(date);
            expect(wrapper.state().formControls.time.value).toEqual(time);
            expect(wrapper.state().formControls.exerciseName.value).toEqual(exerciseLog1.exerciseName);
            expect(wrapper.state().formControls.type.value).toEqual(exerciseLog1.type);
            expect(wrapper.state().formControls.progress.value).toEqual(exerciseLog1.progress);
        })

        it('Submitting the form should call createExerciseLog with set state values and update exercise logs', async () => {
            const promise = Promise.resolve({ exerciseLog: exerciseLog1 });
            createExerciseLog.mockReturnValue(promise);

            var state = {
                formControls: {
                    date: { value: getLocalHTMLDate(exerciseLog1.date) },
                    time: { value: getLocalHTMLTime(exerciseLog1.date) },
                    exerciseName: { value: exerciseLog1.exerciseName },
                    type: { value: exerciseLog1.type },
                    progress: { value: exerciseLog1.progress },
                }
            };

            expect(createExerciseLog.mock.calls.length).toBe(0);
            expect(updatePageExerciseLogs.mock.calls.length).toBe(0);
            const wrapper = shallowSetup();
            wrapper.setState(state);

            wrapper.findWhere(elem => elem.type() == 'button' && elem.prop('children') == 'More Options').simulate('click');

            wrapper.find('form').at(0).simulate('submit', { preventDefault() {} });

            await promise.then(() => {
                expect(createExerciseLog.mock.calls.length).toBe(1);
                expect(createExerciseLog.mock.calls[0][0]).toEqual(exerciseLog1.date);
                expect(createExerciseLog.mock.calls[0][1]).toBe(exerciseLog1.exerciseName);
                expect(createExerciseLog.mock.calls[0][2]).toBe(exerciseLog1.type);
                expect(createExerciseLog.mock.calls[0][3]).toBe(exerciseLog1.progress);
                expect(updatePageExerciseLogs.mock.calls.length).toBe(1);
            });
        })

        it('Should not call updatePageExerciseLogs upon invalid exercise log that is 1008(NoTokenError) and call logout', async () => {
            const promise = Promise.resolve(noTokenErrorRes);
            createExerciseLog.mockReturnValue(promise);

            const wrapper = shallowSetup();

            expect(createExerciseLog.mock.calls.length).toBe(0);
            expect(updatePageExerciseLogs.mock.calls.length).toBe(0);
            expect(logout.mock.calls.length).toBe(0);

            wrapper.find('form').at(0).simulate('submit', { preventDefault() {} });

            await promise.then(() => {
                expect(createExerciseLog.mock.calls.length).toBe(1);
                expect(updatePageExerciseLogs.mock.calls.length).toBe(0);
                expect(logout.mock.calls.length).toBe(1);
            })
        })

        it('Should update state with error message from API response error that is not 1008(NoTokenError) when attempting to log', () => {
            const promise = Promise.resolve({
                error: {
                    code: -1,
                    detail: 'testdetail',
                }
            })

            createExerciseLog.mockReturnValue(promise);

            const wrapper = shallowSetup();
            expect(wrapper.state().messages).toEqual([]);
            wrapper.find('form').at(0).simulate('submit', { preventDefault() {} });

            return promise.then(() => {
                expect(wrapper.state().messages).toEqual(['testdetail']);
            })
        })

    })

})

