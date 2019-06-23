import React from 'react';
import styles from './FeedItem.module.scss';

export default function FeedItem(props){
    return (
        <div className={styles.feedItem}>
            <h3 className={styles.title}>{props.title}</h3>
            {props.children}
        </div>
    )
}
