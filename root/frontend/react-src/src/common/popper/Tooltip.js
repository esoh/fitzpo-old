import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import styles from './Tooltip.module.scss';
// minimum width of popoever when on it's on the right side of the element
let MIN_WIDTH_WHEN_ON_RIGHT = 140;

class Tooltip extends React.Component{

    getTooltipAttr = (direction, rect) => {
        switch(direction){
            case 'right':
                return {
                    position: {
                        left: rect.right,
                        top: rect.top,
                    },
                    arrowAttr: {
                        className: styles.leftArrow,
                        style: {
                            top: (rect.bottom - rect.top)/2,
                        }
                    }
                };
            case 'down':
                return {
                    position: {
                        top: rect.bottom,
                        left: (rect.right - rect.left)*0.3 + rect.left,
                    },
                    arrowAttr: {
                        className: styles.upArrow,
                        style: {
                            left: (rect.right - rect.left)*0.15,
                        }
                    }
                };
            default:
                throw new Error('UNHANDLED DIRECTION?? ' + direction)
        }
    }

    render() {

        let {
            visible,
            targetRect,
            windowWidth,
            dispatch,
            ...attributes
        } = this.props;

        if(!visible) return null;

        var direction = "right";

        // not enough space on the right? move it down
        if(windowWidth - targetRect.right < MIN_WIDTH_WHEN_ON_RIGHT){
            direction = "down";
        }

        let {
            position,
            arrowAttr
        } = this.getTooltipAttr(direction, targetRect);

        return (
            <div className={styles.tooltipContainer} style={position}>
                <div
                    {...attributes}
                    className={classNames(styles.tooltip, styles[direction])}
                />
                <div {...arrowAttr}/>
            </div>
        );
    }
}

Tooltip.propTypes = {
    visible: PropTypes.bool.isRequired,
    windowWidth: PropTypes.number,
    targetRect: PropTypes.object,
}

export default connect(
    function mapStateToProps(state){
        return { windowWidth: state.ui.windowWidth }
    },
    null
)(Tooltip);
