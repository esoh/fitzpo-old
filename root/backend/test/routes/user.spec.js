const chai = require('chai');
const chaiHttp = require('chai-http');

const {Account, User, ExerciseLog} = require('../../models')
const server = require('../../app')
const expect = chai.expect

chai.use(chaiHttp)

describe('Users API', () => {

    before(async () => {
        await User.destroy({ truncate: { cascade: true } })
        await Account.destroy({ truncate: { cascade: true } })
        await ExerciseLog.destroy({ truncate: { cascade: true } })
    })

    describe('user/exercise-logs', () => {

        var cookie;
        var expiredcookie;
        var invalidcookie;
        var user;
        var account = {
            username: 'Test_username',
            email: 'test@email.com',
            password: 'Password!123',
        }
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

        before(() => {
            // create an account, emulate a login, and store the token
            return chai.request(server)
                .post('/accounts')
                .set('Content-Type', 'application/json')
                .send(account)
                .then(() => {
                    return chai.request(server)
                        .post('/auth/token')
                        .set('Content-Type', 'application/json')
                        .send(account);
                })
                .then(res => {
                    cookie = res.headers['set-cookie'];

                    let token = res.headers['set-cookie'][0];
                    if(token.indexOf('; Expires') != -1){
                        token = token.slice(0, token.indexOf('; Expires'))
                    }
                    token +=  '; Expires=Thu, 01 Jan 1970 00:00:00 GMT'
                    expiredcookie = [ token ];

                    token = res.headers['set-cookie'][0];
                    invalidcookie = [ token.slice(0, token.indexOf('=')) + '=invalidtoken' + token.slice(token.indexOf(';')) ];

                    user = res.body.user;
                });
        })

        describe('/POST user/exercise-logs', () => {
            it('successfully logs an exercise from user', () => {
                let date = Date.now();
                return chai.request(server)
                    .post('/user/exercise-logs')
                    .set('Cookie', cookie)
                    .send({
                        ...exercise1,
                        date,
                    })
                    .then(res => {
                        expect(res).to.have.status(201);
                        expect(res.body).to.have.property('exerciseLog');
                        return ExerciseLog.findOne({ where: {
                            date,
                            ...exercise1,
                            userUuid:       user.uuid,
                        } })
                    })
                    .then(res => {
                        expect(res).to.be.ok;
                    })
            })
            it('fails to log an exercise log missing a date from user', () => {
                return chai.request(server)
                    .post('/user/exercise-logs')
                    .set('Cookie', cookie)
                    .send({
                        ...exercise1,
                    })
                    .then(res => {
                        expect(res).to.have.status(400);
                        expect(res.body).to.have.property('error');
                        expect(res.body.error.code).to.eql(1004);

                })
            })
            it('fails to log an exercise log without a cookie', () => {
                let date = Date.now();
                return chai.request(server)
                    .post('/user/exercise-logs')
                    .send({
                        ...exercise1,
                        date,
                    })
                    .then(res => {
                        expect(res).to.have.status(401);
                        expect(res.body).to.have.property('error');
                        expect(res.body.error.code).to.eql(1006);
                })
            })
        })

        describe('/GET user/exercise-logs', () => {
            before(async () => {
                await ExerciseLog.destroy({ truncate: { cascade: true } });
                await ExerciseLog.create({
                    ...exercise1,
                    userUuid:   user.uuid,
                    date:       Date.now(),
                })
            })

            it('successfully gets user\'s exercise history', () => {
                return chai.request(server)
                    .get('/user/exercise-logs')
                    .set('Cookie', cookie)
                    .then(res => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.have.property('exerciseLogs');
                        expect(res.body.exerciseLogs).to.be.an('array');
                        expect(res.body.exerciseLogs.length).to.equal(1);
                        expect(res.body.exerciseLogs[0]).to.not.have.property('userUuid');
                        var filteredLogs = res.body.exerciseLogs.map(log => { return {
                            exerciseName:   log.exerciseName,
                            type:           log.type,
                            progress:       log.progress,
                        } });
                        expect(filteredLogs).to.deep.include(exercise1);
                    })
            })

            it('fails to get user\'s exercise history with no auth cookie', () => {
                return chai.request(server)
                    .get('/user/exercise-logs')
                    .then(res => {
                        expect(res).to.have.status(401);
                        expect(res.body).to.have.property('error');
                        expect(res.body.error.code).to.eql(1006);
                    })
            })

            it('fails to get user\'s exercise history with expired cookie', () => {
                return chai.request(server)
                    .get('/user/exercise-logs')
                    .set('Cookie', expiredcookie)
                    .then(res => {
                        expect(res).to.have.status(401);
                        expect(res.body).to.have.property('error');
                        expect(res.body.error.code).to.eql(1006);
                    })
            })

            it('fails to get user\'s exercise history with invalid cookie', () => {
                return chai.request(server)
                    .get('/user/exercise-logs')
                    .set('Cookie', invalidcookie)
                    .then(res => {
                        expect(res).to.have.status(400);
                        expect(res.body).to.have.property('error');
                        expect(res.body.error.code).to.eql(1001);
                    })
            })

        })
    })
})
