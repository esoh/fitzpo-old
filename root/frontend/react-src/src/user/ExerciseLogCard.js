import React from 'react';
import PropTypes from 'prop-types';

import styles from './ExerciseLogCard.module.scss';

function ExerciseLogCard(props){
    var time = (props.datetime) ? props.datetime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}) : '';
    var type = (props.type) ? props.type : '';
    return (
        <div className={styles.exerciseLog}>
            <div className={styles.body}>
                <div className={styles.descriptor}>
                    <span className={styles.title}>{props.exerciseName}</span>
                    <span className={styles.subtitle}>{type}</span>
                </div>
                <div className={styles.content}>
                    <span>{props.progress}</span>
                </div>
            </div>
            <div className={styles.footer}>
                <p className={styles.timestamp}>{time}</p>
            </div>
        </div>
    );
}

ExerciseLogCard.propTypes = {
    exerciseName: PropTypes.string.isRequired,
    type: PropTypes.string,
    progress: PropTypes.string.isRequired,
    datetime: PropTypes.instanceOf(Date),
}

export default ExerciseLogCard;
