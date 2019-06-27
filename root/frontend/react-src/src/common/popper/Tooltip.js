import React from 'react';
import styles from './Tooltip.module.scss';

function Tooltip(props) {
    return (
        <div {...props} className={styles.tooltip}/>
    )
}

export default Tooltip;
