import React from 'react';
import PropTypes from 'prop-types';

import styles from './Tooltip.module.scss';

class Tooltip extends React.Component{

    render() {

        let {
            visible,
            targetRect,
            ...attributes
        } = this.props;

        if(!visible) return null;

        let position = {
            left: targetRect.right,
            top: targetRect.top,
        }

        return (
            <div
                {...attributes}
                className={styles.tooltip}
                style={position}
            />
        );
    }
}

Tooltip.propTypes = {
    visible: PropTypes.bool.isRequired,
}

export default Tooltip;
