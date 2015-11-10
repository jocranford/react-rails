import React from 'react';
import { StaggeredMotion, spring, presets } from 'react-motion';
import Immutable from 'immutable';
import range from 'lodash/utility/range';
import registerComponent from './../react-automount';

const Heads = React.createClass({
  getInitialState() {
    return {x: 250, y: 300, mouseTrails: false};

  },

  componentDidMount() {
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('touchmove', this.handleTouchMove);
  },

  handleMouseMove({pageX: x, pageY: y}) {
    this.setState({x, y});
  },

  handleTouchMove({touches}) {
    this.handleMouseMove(touches[0]);
  },

  handleSwitchImages() {
    this.setState({mouseTrails: !this.state.mouseTrails});
  },

  getStyles(prevStyles) {
    const endValue = prevStyles.map((_, i) => {
      return i === 0
        ? this.state
        : {
            x: spring(prevStyles[i - 1].x, this.getSpringConfig()),
            y: spring(prevStyles[i - 1].y, this.getSpringConfig()),
          };
    });
    return endValue;
  },

  getSpringConfig() {
    return this.state.mouseTrails ? [120, 14] : [60, 14];
  },

  getClassName(i) {
    return this.state.mouseTrails ? 'mouse-cursor' : `head head-${i}`;
  },

  getDefaultStyles() {
    return range(10).map(() => ({x: 0, y: 0}));
  },

  render() {
    return (
      <div>
        <button onClick={this.handleSwitchImages}>
          {this.state.mouseTrails ? 'Show Heads' : 'Mouse Trails'}
        </button>
        <StaggeredMotion
          defaultStyles={this.getDefaultStyles()}
          styles={this.getStyles}>
          {
            (interpolatedStyles) =>
              <div>
                {interpolatedStyles.map(({x, y}, i) =>
                  <div
                    key={i}
                    className={this.getClassName(i)}
                    style={{
                      WebkitTransform: `translate3d(${x - 25}px, ${y - 25}px, 0)`,
                      transform: `translate3d(${x - 25}px, ${y - 25}px, 0)`,
                      zIndex: interpolatedStyles.length - i,
                    }}
                  />
                )}
              </div>
          }
        </StaggeredMotion>
      </div>
    );
  },
});

registerComponent('Heads', Heads);
