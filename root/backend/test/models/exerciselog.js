'use strict';
const chai = require('chai')
const expect = chai.expect
const app = require('../../models');

describe('models/exerciselog', () => {

    var testUser = {
        username: 'test_username',
    };
    var exercise1 = {
        exerciseName:   'Bench Press',
        type:           '5x5',
        progress:       'weight: 225, reps: 5/5/5/5/5',
    };
    var exercise2 = {
        exerciseName:   'Lying Tricep Extension',
        type:           '3x10',
        progress:       'weight: 85/85/75, reps: 10/7/10',
    };

    beforeEach(async () => {
        this.User = app.User;
        this.ExerciseLog = app.ExerciseLog;

        // clean
        await this.User.destroy({ truncate: {cascade: true} });
        await this.ExerciseLog.destroy({ truncate: {cascade: true} });

        // create test data
        let user = await this.User.create(testUser);
        testUser.uuid = user.uuid;

        await this.ExerciseLog.create({
            date:           Date.now(),
            userUuid:       testUser.uuid,
            ...exercise1,
        });
        await this.ExerciseLog.create({
            date:           Date.now(),
            userUuid:       testUser.uuid,
            ...exercise2,
        });
    })

    it('Should cascading delete user\'s logged exercises when user is deleted', () => {
        return this.ExerciseLog.getExerciseHistory(testUser.uuid)
            .then(logs => {
                expect(logs.length).to.eql(2);
                return this.User.destroy({ truncate: {cascade: true}});
            })
            .then(() => {
                return this.ExerciseLog.getExerciseHistory(testUser.uuid)
            })
            .then(logs => {
                expect(logs.length).to.eql(0);
            });
    })

    describe('#getExerciseHistory()', () => {
        it('successfully returns user\'s exercise history as a list', () => {
            return this.ExerciseLog.getExerciseHistory(testUser.uuid)
                .then(logs => {
                    expect(logs).to.be.an('array');
                    var filteredLogs = logs.map(log => { return {
                        exerciseName:   log.exerciseName,
                        type:           log.type,
                        progress:       log.progress,
                        userUuid:       log.userUuid,
                    } });
                    expect(filteredLogs).to.deep.include({
                        ...exercise1,
                        userUuid:   testUser.uuid,
                    })
                    expect(filteredLogs).to.deep.include({
                        ...exercise2,
                        userUuid:   testUser.uuid,
                    })
                })
        })
    })
})
