jest.mock('../services/userService');

import React from 'react';
jest.unmock('react-router-dom');
import { Link, Redirect, BrowserRouter as Router } from "react-router-dom";
import { shallow } from 'enzyme';

import CreateExerciseLog from './CreateExerciseLog';
import { UserExerciseLogs } from './UserExerciseLogs';
import {
    createExerciseLog,
    getUserExerciseLogs,
    deleteExerciseLog,
} from '../services/userService';
import ExerciseLogCard from './ExerciseLogCard';

var setLoggedIn = jest.fn();
var props = { setLoggedIn };

function shallowSetup() {
    return shallow(<UserExerciseLogs {...props} />);
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


describe('User Exercise Logs Component', () => {

    describe('Existing components and elements', () => {
        beforeEach(() => {
            getUserExerciseLogs.mockClear();
        })

        it('Should render CreateExerciseLog component with correct props', async () => {
            var promise = Promise.resolve({ exerciseLogs: [] });
            getUserExerciseLogs.mockReturnValue(promise);
            expect(getUserExerciseLogs.mock.calls.length).toBe(0);
            const wrapper = shallowSetup();

            var creator = wrapper.find(CreateExerciseLog)
            expect(creator.length).toBe(1);
            creator = creator.at(0);

            await promise.then(() => {
                expect(getUserExerciseLogs.mock.calls.length).toBe(1);
            });

            creator.props().updatePageExerciseLogs();

            await promise.then(() => {
                expect(getUserExerciseLogs.mock.calls.length).toBe(2);
            });

            expect(setLoggedIn.mock.calls.length).toBe(0);
            expect(wrapper.state().loginRedirect).toBe(false);
            creator.props().logout();
            expect(setLoggedIn.mock.calls.length).toBe(1);
            expect(setLoggedIn.mock.calls[0][0]).toBe(false);
            expect(wrapper.state().loginRedirect).toBe(true);
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

        it('Should generate view components with correct props from state logs values', () => {
            var state = {
                logs: [exerciseLog1],
            }

            const wrapper = shallowSetup();
            wrapper.setState(state);

            let exerciseLogCards = wrapper.find(ExerciseLogCard);
            expect(exerciseLogCards.length).toBe(1);

            let props = exerciseLogCards.at(0).props();

            expect(props.exerciseName).toEqual(exerciseLog1.exerciseName);
            expect(props.datetime).toEqual(exerciseLog1.date);
            expect(props.type).toEqual(exerciseLog1.type);
            expect(props.progress).toEqual(exerciseLog1.progress);
        })
    })

    describe('Deleting exercise log', () => {
        beforeEach(() => {
            deleteExerciseLog.mockClear();
            getUserExerciseLogs.mockClear();
        })

        it('Exercise Log card props delete should call correct function with correct params', async () => {
            var promise = Promise.resolve();
            deleteExerciseLog.mockReturnValue(promise);
            var promise2 = Promise.resolve({ exerciseLogs: [exerciseLog1] });
            getUserExerciseLogs.mockReturnValue(promise2);

            expect(getUserExerciseLogs.mock.calls.length).toBe(0);
            const wrapper = shallowSetup();

            await promise2.then(() => {
                expect(getUserExerciseLogs.mock.calls.length).toBe(1);
            })

            expect(wrapper.find(ExerciseLogCard).length).toBe(1);
            let card = wrapper.find(ExerciseLogCard).at(0);

            expect(deleteExerciseLog.mock.calls.length).toBe(0);
            expect(getUserExerciseLogs.mock.calls.length).toBe(1);
            promise2 = Promise.resolve({ exerciseLogs: [] });
            getUserExerciseLogs.mockReturnValue(promise2);

            card.props().deleteLog();

            await promise.then(() => {
                expect(deleteExerciseLog.mock.calls.length).toBe(1);
                expect(deleteExerciseLog.mock.calls[0][0]).toBe(exerciseLog1.id);
            })

            await promise2.then(() => {
                wrapper.update()
            }).then(() => {
                expect(wrapper.find(ExerciseLogCard).length).toBe(0);
                expect(getUserExerciseLogs.mock.calls.length).toBe(2);
            })
        })
    })
})
