import React from 'react';
import styles from './CardGroup.module.scss';

export default function CardGroup(props){
    return (
        <div className={styles.cardGroup}>
            <h3 className={styles.title}>{props.title}</h3>
            {props.children}
        </div>
    )
}
