import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { FormInput } from '../common/form';
import FeedItem from './FeedItem';
import { createExerciseLog } from '../services/userService';
import {
    getLocalHTMLDate,
    getLocalHTMLTime,
} from '../utils/utils';
import styles from './CreateExerciseLog.module.scss';

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
            moreOpts: false,
        }
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    // given a field, returns a function to have this state value listen for
    // changes
    handleChangeFor = (field) => (event) => {
        const value = event.target.value;

        this.setState(prevState => ({
            formControls: {
                ...prevState.formControls,
                [field]: {
                    ...prevState.formControls[field],
                    value
                }
            }
        }));
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.logExercise();
    }

    logExercise = () => {
        // TODO: implement clientside validation
        var date;
        if(this.state.moreOpts){
            date = new Date(this.state.formControls.date.value + ' ' + this.state.formControls.time.value);
        } else {
            date = new Date();
        }

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

    toggleMoreOptions = () => {
        this.setState({
            moreOpts: !this.state.moreOpts
        })
    }

    render() {

        var messages = this.state.messages.map(msg => <p key={msg}>{msg}</p>);

        return (
            <FeedItem title="Log an exercise">
                <form onSubmit={this.handleSubmit} className={styles.form}>
                    <div className={styles.body}>
                        <div className={styles.row}>
                            <FormInput
                                label="Exercise Name:"
                                name="exerciseName"
                                type="text"
                                value={this.state.formControls.exerciseName.value}
                                onChange={this.handleChangeFor('exerciseName')}
                                placeholder="e.g. Bench Press"
                            />
                            <FormInput
                                label="Type:"
                                name="type"
                                type="text"
                                value={this.state.formControls.type.value}
                                onChange={this.handleChangeFor('type')}
                                placeholder="e.g. 5x5"
                            />
                        </div>
                        <FormInput
                            label="Progress:"
                            name="progress"
                            type="text"
                            value={this.state.formControls.progress.value}
                            onChange={this.handleChangeFor('progress')}
                            placeholder="e.g. 50lb 5/5/5/5/5"
                        />
                        { this.state.moreOpts ? (
                            <div className={styles.row}>
                                <FormInput
                                    label="Date:"
                                    name="date"
                                    type="date"
                                    value={this.state.formControls.date.value}
                                    onChange={this.handleChangeFor('date')}
                                />
                                <FormInput
                                    label="Time:"
                                    name="time"
                                    type="time"
                                    value={this.state.formControls.time.value}
                                    onChange={this.handleChangeFor('time')}
                                />
                            </div>
                        ) : null }
                    </div>
                    <div className={classNames(styles.row, styles.footer)}>
                        <button type="button" onClick={this.toggleMoreOptions}>{this.state.moreOpts ? "Less Options" : "More Options"}</button>
                        <input type="submit" value="Log Exercise"/>
                    </div>
                </form>
                {messages}
            </FeedItem>
        )
    }
}

CreateExerciseLog.propTypes = {
    logout: PropTypes.func.isRequired,
    updatePageExerciseLogs: PropTypes.func.isRequired,
}

export default CreateExerciseLog;
