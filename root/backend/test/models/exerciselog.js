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
            date:           new Date(Date.now() - 10000 * 60),
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
        return this.ExerciseLog.getExerciseLogs(testUser.uuid)
            .then(logs => {
                expect(logs.length).to.eql(2);
                return this.User.destroy({ truncate: {cascade: true}});
            })
            .then(() => {
                return this.ExerciseLog.getExerciseLogs(testUser.uuid)
            })
            .then(logs => {
                expect(logs.length).to.eql(0);
            });
    })

    describe('#getExerciseLogs()', () => {
        it('successfully returns user\'s exercise history as a list sorted by most recent', () => {
            return this.ExerciseLog.getExerciseLogs(testUser.uuid)
                .then(logs => {
                    expect(logs).to.be.an('array');
                    var filteredLogs = logs.map(log => { return {
                        exerciseName:   log.exerciseName,
                        type:           log.type,
                        progress:       log.progress,
                        userUuid:       log.userUuid,
                    } });
                    expect(filteredLogs[0]).to.deep.equal({
                        ...exercise2,
                        userUuid:   testUser.uuid,
                    })
                    expect(filteredLogs[1]).to.deep.equal({
                        ...exercise1,
                        userUuid:   testUser.uuid,
                    })
                })
        })
    })

    describe('#addExerciseLog()', () => {
        it('successfully adds exercise log', () => {
            return this.ExerciseLog.destroy({ truncate: {cascade: true} })
                .then(() => {
                    return this.ExerciseLog.addExerciseLog(testUser.uuid, Date.now(), exercise1.exerciseName, exercise1.type, exercise1.progress)
                })
                .then(exerciseLog => {
                    return this.ExerciseLog.findOne({ where: {
                        ...exercise1,
                        userUuid:   testUser.uuid,
                    } })
                })
                .then(exerciseLog => {
                    expect(exerciseLog).to.be.ok;
                })
        })
    })

    describe('#deleteExerciseLog()', () => {
        it('successfully deletes exercise log', () => {
            var id;
            return this.ExerciseLog.findOne({ where: {
                ...exercise1,
                userUuid:   testUser.uuid,
            } })
                .then(exerciseLog => {
                    id = exerciseLog.id;
                    return this.ExerciseLog.deleteExerciseLog(id);
                })
                .then(() => {
                    return this.ExerciseLog.findOne({ where: {
                        ...exercise1,
                        userUuid:   testUser.uuid,
                    } })
                })
                .then(exerciseLog => {
                    expect(exerciseLog).to.not.be.ok;
                })
        })
    })
})
