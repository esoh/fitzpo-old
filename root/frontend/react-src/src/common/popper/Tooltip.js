import React from 'react';
import PropTypes from 'prop-types';

import styles from './Tooltip.module.scss';

class Tooltip extends React.Component{
    render() {

        let {
            visible,
            ...attributes
        } = this.props;

        if(!visible) return null;

        return (
            <div {...attributes} className={styles.tooltip}/>
        );
    }
}

Tooltip.propTypes = {
    visible: PropTypes.bool.isRequired,
}

export default Tooltip;
