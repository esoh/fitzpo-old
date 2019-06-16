jest.mock('../services/userService');

import React from 'react';
jest.unmock('react-router-dom');
import { Link, Redirect, BrowserRouter as Router } from "react-router-dom";
import { shallow, mount } from 'enzyme';

import { UserExerciseLogs } from './UserExerciseLogs';
import {
    createExerciseLog,
    getUserExerciseLogs,
} from '../services/userService';
import {
    getLocalHTMLDate,
    getLocalHTMLTime,
} from '../utils/utils';

function shallowSetup() {
    return shallow(<UserExerciseLogs />);
}
var date = new Date();
date = new Date(date - date.getSeconds()*1000 - date.getMilliseconds());

const exerciseLog1 = {
    id:             1,
    date:           date,
    exerciseName:   'Bench Press',
    type:           '5x5',
    progress:       '5/5/5/5/5'
}

const noTokenErrorRes = {
    error: {
        code: 1008
    }
}

describe('User Exercise Logs Component', () => {

    describe('Existing components and elements', () => {
        getUserExerciseLogs.mockReturnValue(Promise.resolve({ exerciseLogs: [] }));
        const wrapper = shallowSetup();

        it('Should have link back to home', () => {
            expect(wrapper.find(Link).findWhere(link => link.props()['to'] === '/').length).toBe(1);
        })

        it('Should have table', () => {
            expect(wrapper.findWhere(elem => elem.type() == 'table').length).toBe(1);
        })

        it('Should have exercise log input form', () => {
            expect(wrapper.findWhere(elem => elem.type() == 'input' && elem.prop('name') == 'date').length).toBe(1);
            expect(wrapper.findWhere(elem => elem.type() == 'input' && elem.prop('name') == 'time').length).toBe(1);
            expect(wrapper.findWhere(elem => elem.type() == 'input' && elem.prop('name') == 'exerciseName').length).toBe(1);
            expect(wrapper.findWhere(elem => elem.type() == 'input' && elem.prop('name') == 'type').length).toBe(1);
            expect(wrapper.findWhere(elem => elem.type() == 'input' && elem.prop('name') == 'progress').length).toBe(1);
            expect(wrapper.findWhere(elem => elem.type() == 'input' && elem.prop('type') == 'submit').length).toBe(1);
        })

        it('Date state value should be set to a valid date', () => {
            expect(isNaN(Date.parse(wrapper.state().formControls.date.value))).toBe(false);
        })
    })

    describe('Get user\'s exercise logs', () => {
        beforeEach(() => {
            getUserExerciseLogs.mockClear();
        })

        const exerciseLogs = [exerciseLog1]

        it('Should call API service method to get logs on mount and update state logs value upon valid response', () => {
            const promise = Promise.resolve({ exerciseLogs });
            getUserExerciseLogs.mockReturnValue(promise);

            expect(getUserExerciseLogs.mock.calls.length).toBe(0);
            const wrapper = shallowSetup();
            expect(getUserExerciseLogs.mock.calls.length).toBe(1);

            return promise.then(() => {
                    wrapper.update();
                })
                .then(() => {
                    expect(wrapper.state().logs).toEqual(exerciseLogs)
                });
        })

        it('Should call API service method to get logs on mount and update state redirect value upon 1008(NoTokenError)', () => {

            const promise = Promise.resolve(noTokenErrorRes);
            getUserExerciseLogs.mockReturnValue(promise);

            expect(getUserExerciseLogs.mock.calls.length).toBe(0);
            const wrapper = shallowSetup();
            expect(getUserExerciseLogs.mock.calls.length).toBe(1);
            expect(wrapper.state().loginRedirect).toBe(false);

            return promise.then(() => {
                    wrapper.update();
                })
                .then(() => {
                    expect(wrapper.state().loginRedirect).toBe(true);
                });
        })
    })

    describe('Log exercise', () => {
        beforeEach(() => {
            getUserExerciseLogs.mockClear();
            createExerciseLog.mockClear();
        })

        it('Form input fields should update their respective state values', () => {
            getUserExerciseLogs.mockReturnValue(Promise.resolve({exerciseLogs: []}));

            var wrapper = mount(
                <Router>
                    <UserExerciseLogs />
                </Router>
            );

            wrapper = wrapper.find(UserExerciseLogs);

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

        it('Submitting the form should call createExerciseLog with set state values and call GET on exercise-logs', async () => {
            const promise = Promise.resolve({exerciseLogs: []});
            const promise2 = Promise.resolve({ exerciseLog: exerciseLog1 });
            getUserExerciseLogs.mockReturnValue(promise);
            createExerciseLog.mockReturnValue(promise2);

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
            expect(getUserExerciseLogs.mock.calls.length).toBe(0);
            const wrapper = shallowSetup();
            wrapper.setState(state);

            await promise.then(() => {
                expect(getUserExerciseLogs.mock.calls.length).toBe(1);
            });

            wrapper.find('form').at(0).simulate('submit', { preventDefault() {} });

            await promise2.then(() => {
                expect(createExerciseLog.mock.calls.length).toBe(1);
                expect(createExerciseLog.mock.calls[0][0]).toEqual(exerciseLog1.date);
                expect(createExerciseLog.mock.calls[0][1]).toBe(exerciseLog1.exerciseName);
                expect(createExerciseLog.mock.calls[0][2]).toBe(exerciseLog1.type);
                expect(createExerciseLog.mock.calls[0][3]).toBe(exerciseLog1.progress);
                expect(getUserExerciseLogs.mock.calls.length).toBe(2);
            })
        })

        it('Should call not get exercise-logs API call upon invalid exercise log that is 1008(NoTokenError) and set redirect', async () => {
            const promise = Promise.resolve({exerciseLogs: []});
            const promise2 = Promise.resolve(noTokenErrorRes);
            getUserExerciseLogs.mockReturnValue(promise);
            createExerciseLog.mockReturnValue(promise2);

            expect(createExerciseLog.mock.calls.length).toBe(0);
            expect(getUserExerciseLogs.mock.calls.length).toBe(0);
            const wrapper = shallowSetup();

            expect(wrapper.state().loginRedirect).toBe(false);

            await promise.then(() => {
                expect(getUserExerciseLogs.mock.calls.length).toBe(1);
            });

            wrapper.find('form').at(0).simulate('submit', { preventDefault() {} });

            await promise2.then(() => {
                expect(createExerciseLog.mock.calls.length).toBe(1);
                expect(getUserExerciseLogs.mock.calls.length).toBe(1);
                expect(wrapper.state().loginRedirect).toBe(true);
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

    describe('State to DOM', () => {
        it('Should render correct DOM paragraph from state message value', () => {
            var state = {
                messages: ['hello', 'hi', 'test'],
            }

            const wrapper = shallowSetup();
            wrapper.setState(state);
            expect(wrapper.findWhere(elem => elem.type() == 'p' && elem.text() === 'hello').length).toBe(1);
            expect(wrapper.findWhere(elem => elem.type() == 'p' && elem.text() === 'hi').length).toBe(1);
            expect(wrapper.findWhere(elem => elem.type() == 'p' && elem.text() === 'test').length).toBe(1);
        })

        it('Should render correct DOM table elemtns from state logs values', () => {
            var state = {
                logs: [exerciseLog1],
            }

            const wrapper = shallowSetup();
            wrapper.setState(state);
            expect(wrapper.findWhere(elem => elem.type() == 'td' && elem.prop('children') == exerciseLog1.date.toLocaleTimeString()).length).toBe(1);
            expect(wrapper.findWhere(elem => elem.type() == 'td' && elem.text() === exerciseLog1.exerciseName).length).toBe(1);
            expect(wrapper.findWhere(elem => elem.type() == 'td' && elem.text() === exerciseLog1.type).length).toBe(1);
            expect(wrapper.findWhere(elem => elem.type() == 'td' && elem.text() === exerciseLog1.progress).length).toBe(1);
        })
    })
})
