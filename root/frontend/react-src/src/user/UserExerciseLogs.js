import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import PropTypes from 'prop-types';

import ExerciseLogCard from './ExerciseLogCard';
import FeedItem from './FeedItem';
import CreateExerciseLog from './CreateExerciseLog';
import {
    getUserExerciseLogs,
    deleteExerciseLog,
} from '../services/userService';
import { setLoggedIn } from '../redux/actions';
import styles from './UserExerciseLogs.module.scss';

export class UserExerciseLogs extends React.Component {

    abortController = new window.AbortController();

    constructor(props){
        super(props);
        this.state = {
            messages: [],
            loginRedirect: false,
            logs: [],
        }
    }


    componentDidMount() {
        this.updatePageExerciseLogs();
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    updatePageExerciseLogs = () => {
        getUserExerciseLogs()
            .then(res => {
                if(res && res.error) return this.handleErrorResponse(res.error);

                if(res.exerciseLogs){
                    this.setState({ logs: res.exerciseLogs })
                } else {
                    console.error('no logs found. this shouldn\'t happen');
                }
            })
            .catch(this.handleError);
    }

    logout = () => {
        this.props.setLoggedIn(false);
        this.setState({ loginRedirect: true });
    }

    handleErrorResponse = (error) => {
        if(error.code === 1008) return this.logout()

        this.setState({
            messages: [error.detail]
        })
    }

    handleError(error){
        if(error.name === 'AbortError') return;
        console.log(error);
    }

    groupLogsByDate(logs){
        var dateLogsMap = {};
        logs.forEach((log) => {
            let date = new Date(log.date).toLocaleDateString();
            if(dateLogsMap[date]) dateLogsMap[date].push(log); else dateLogsMap[date] = [log];
        })
        return dateLogsMap;
    }

    deleteLog = (id) => {
        deleteExerciseLog(id)
            .then(res => {
                if(res && res.error) return this.handleErrorResponse(res.error);
                this.updatePageExerciseLogs();
            })
            .catch(this.handleError);
    }

    logToTableRow = (log) => {
        var props = {
            exerciseName: log.exerciseName,
            type: log.type,
            progress: log.progress,
            datetime: new Date(log.date),
        }
        return (<ExerciseLogCard key={log.id} {...props} deleteLog={() => this.deleteLog(log.id)}/>);
    }

    render() {

        if (this.state.loginRedirect) return <Redirect to='/login' />;

        var messages = this.state.messages.map(msg => <p key={msg}>{msg}</p>);

        var logsByDate = this.groupLogsByDate(this.state.logs);

        var tableData = [];
        for(var date in logsByDate){
            tableData.push((
                <FeedItem title={date} key={date}>
                    {logsByDate[date].map(this.logToTableRow)}
                </FeedItem>
            ));
        };

        return (
            <div className={styles.container}>

                <CreateExerciseLog logout={this.logout} updatePageExerciseLogs={this.updatePageExerciseLogs}/>

                {messages}

                {tableData}
            </div>
        )
    }
}

UserExerciseLogs.propTypes = {
    setLoggedIn: PropTypes.func.isRequired,
}

export default connect(
    null,
    { setLoggedIn }
)(UserExerciseLogs)
