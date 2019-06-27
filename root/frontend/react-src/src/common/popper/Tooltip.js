import React from 'react';
import PropTypes from 'prop-types';

import styles from './Tooltip.module.scss';

class Tooltip extends React.Component{

    //minWidthOnRight = '180px';

    render() {

        let {
            visible,
            targetRect,
            ...attributes
        } = this.props;

        if(!visible) return null;

        let arrowAttr = {
            className: styles.leftArrow,
            style: {
                top: (targetRect.bottom - targetRect.top)/2,
            }
        }

        let position = {
            left: targetRect.right,
            top: targetRect.top,
        }

        return (
            <div className={styles.tooltipContainer} style={position}>
                <div
                    {...attributes}
                    className={styles.tooltip}
                />
                <div {...arrowAttr}/>
            </div>
        );
    }
}

Tooltip.propTypes = {
    visible: PropTypes.bool.isRequired,
}

export default Tooltip;
