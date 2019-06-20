import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './ExerciseLogCard.module.scss';

class ExerciseLogCard extends React.Component {
    //var time = (this.props.datetime) ? this.props.datetime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}) : '';
    state = {
        toolbarVisible: false,
    }

    mouseEnter = (e) => {
        this.setState({ toolbarVisible: true })
    }
    mouseLeave = (e) => {
        this.setState({ toolbarVisible: false })
    }
    mouseHover = (e) => {
        this.setState((state) => {
            return (state.toolbarVisible) ? null : { toolbarVisible: true };
        })
    }

    render() {
        var type = (this.props.type) ? this.props.type : '';

        var visibility = this.state.toolbarVisible ? styles.show : styles.hide;
        var footerClass = classNames(styles.footer, visibility);
        return (
            <div className={styles.exerciseLog} onMouseOver={this.mouseHover} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
                <div className={styles.body}>
                    <div className={styles.descriptor}>
                        <span className={styles.title}>{this.props.exerciseName}</span>
                        <span className={styles.subtitle}>{type}</span>
                    </div>
                    <div className={styles.content}>
                        <span>{this.props.progress}</span>
                    </div>
                </div>
                <div className={footerClass}>
                    <button onClick={this.props.deleteLog}>Delete</button>
                </div>
            </div>
        );
    }
}

ExerciseLogCard.propTypes = {
    exerciseName: PropTypes.string.isRequired,
    type: PropTypes.string,
    progress: PropTypes.string.isRequired,
    //datetime: PropTypes.instanceOf(Date),
    deleteLog: PropTypes.func.isRequired,
}

export default ExerciseLogCard;
