import React from 'react';
import { StaggeredMotion, spring, presets } from 'react-motion';
import Immutable from 'immutable';
import registerComponent from './../react-automount';

const StaggeredElements = {
  defaultStyles() {
    return [
      { height: 0, width: 0, color: 'red', },
      { height: 0, width: 0, color: 'orange', },
      { height: 0, width: 0, color: 'yellow', },
      { height: 0, width: 0, color: 'green', },
      { height: 0, width: 0, color: 'blue', },
      { height: 0, width: 0, color: 'indigo', },
      { height: 0, width: 0, color: 'violet', }
    ];
  },
};

const StaggeredMotionList = React.createClass({
  createElement() {
    return Immutable.fromJS({
      stiffness: this.state.stiffness,
      damping: this.state.damping,
    });
  },

  render() {
    return (
      <div>
        <StaggeredMotion
          defaultStyles={StaggeredElements.defaultStyles()}
          styles={prevStyles => prevStyles.map((style, i) => {
            return i === 0
            ? {height: spring(100, [200, 2]), width: spring(100, [200, 2]), color: style.color}
            : {height: prevStyles[i - 1].height, width: prevStyles[i - 1].width, color: style.color};
          })}>
          {interpolatedStyles =>
            <div>
              {interpolatedStyles.map((interpolatedStyle, i) =>
                <div
                  key={i}
                  style={{overflow: 'hidden', display: 'inline-block', height: interpolatedStyle.height, width: interpolatedStyle.width, backgroundColor: interpolatedStyle.color}}
                />
              )}
            </div>
          }
        </StaggeredMotion>
      </div>
    );
  },
});

registerComponent('StaggeredMotionList', StaggeredMotionList);
