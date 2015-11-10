import React from 'react';
import { Motion, spring } from 'react-motion';
import registerComponent from './../react-automount';

const SimpleMotion = React.createClass({
  render() {
    return (
      <Motion defaultStyle={{height: 0, width: 0}} style={{height: spring(100, [300, 30]), width: spring(100, [300, 30])}}>
        {interpolatedStyle =>
          <div style={{
            overflow: 'hidden',
            display: 'inline-block',
            height: interpolatedStyle.height,
             width: interpolatedStyle.width,
             backgroundColor: '#cc4252'}}>
          </div>
        }
      </Motion>
    );
  },
});

registerComponent('SimpleMotion', SimpleMotion);
