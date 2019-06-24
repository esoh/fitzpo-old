import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

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
                            <label>
                                Exercise Name:
                                <input name="exerciseName" type="text" value={this.state.formControls.exerciseName.value} onChange={this.handleChange} placeholder="e.g. Bench Press"/>
                            </label>
                            <label>
                                Type:
                                <input name="type" type="text" value={this.state.formControls.type.value} onChange={this.handleChange} placeholder="e.g. 5x5"/>
                            </label>
                        </div>
                        <label>
                            Progress:
                            <input name="progress" type="text" value={this.state.formControls.progress.value} onChange={this.handleChange} placeholder="e.g. 5/5/5/5/5"/>
                        </label>
                        { this.state.moreOpts ? (
                            <div className={styles.row}>
                                <label>
                                    Date:
                                    <input name="date" type="date" value={this.state.formControls.date.value} onChange={this.handleChange}/>
                                </label>
                                <label>
                                    Time:
                                    <input name="time" type="time" value={this.state.formControls.time.value} onChange={this.handleChange}/>
                                </label>
                            </div>
                        ) : null }
                    </div>
                    <div className={classNames(styles.row, styles.footer)}>
                        <button type="button" onClick={this.toggleMoreOptions} className={styles.secondary}>{this.state.moreOpts ? "Less Options" : "More Options"}</button>
                        <input type="submit" value="Log Exercise" className={styles.primary}/>
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
