import React from 'react';
import PropTypes from 'prop-types';

import { createExerciseLog } from '../services/userService';
import {
    getLocalHTMLDate,
    getLocalHTMLTime,
} from '../utils/utils';

class CreateExerciseLog extends React.Component {

    abortController = new window.AbortController();

    constructor(props){
        super(props);
        let date = new Date();
        this.state = {
            formControls: {
                date: { value: getLocalHTMLDate(date) },
                time: { value: getLocalHTMLTime(date) },
                exerciseName: { value: '' },
                type: { value: '' },
                progress: { value: '' },
            },
            messages: [],
        }
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    handleChange = (event) => {
        const field = event.target.name;
        const value = event.target.value;

        this.setState({
            formControls: {
                ...this.state.formControls,
                [field]: {
                    ...this.state.formControls[field],
                    value
                }
            }
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.logExercise();
    }

    logExercise = () => {
        // TODO: implement clientside validation
        var date = new Date(this.state.formControls.date.value + ' ' + this.state.formControls.time.value);
        createExerciseLog(date,
                          this.state.formControls.exerciseName.value,
                          this.state.formControls.type.value,
                          this.state.formControls.progress.value)
            .then(res => {
                // TODO: maybe add the returned log to the list client-side?
                if(res && res.error) return this.handleErrorResponse(res.error);
                this.props.updatePageExerciseLogs();
            })
            .catch(err => {
                this.handleError(err)
                this.props.updatePageExerciseLogs();
            });
    }

    handleErrorResponse = (error) => {
        if(error.code === 1008){
            return this.props.logout();
        }

        this.setState({
            messages: [error.detail]
        })
    }

    handleError(error){
        if(error.name === 'AbortError') return;
        console.log(error);
    }

    render() {

        var messages = this.state.messages.map(msg => <p key={msg}>{msg}</p>);

        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Date:
                        <input name="date" type="date" value={this.state.formControls.date.value} onChange={this.handleChange}/>
                    </label>
                    <label>
                        Time:
                        <input name="time" type="time" value={this.state.formControls.time.value} onChange={this.handleChange}/>
                    </label>
                    <label>
                        Exercise Name:
                        <input name="exerciseName" type="text" value={this.state.formControls.exerciseName.value} onChange={this.handleChange}/>
                    </label>
                    <label>
                        Type:
                        <input name="type" type="text" value={this.state.formControls.type.value} onChange={this.handleChange}/>
                    </label>
                    <label>
                        Progress:
                        <input name="progress" type="text" value={this.state.formControls.progress.value} onChange={this.handleChange}/>
                    </label>
                    <input type="submit" value="Log Exercise" />
                </form>
                {messages}
            </>
        )
    }
}

CreateExerciseLog.propTypes = {
    logout: PropTypes.func.isRequired,
    updatePageExerciseLogs: PropTypes.func.isRequired,
}

export default CreateExerciseLog;
