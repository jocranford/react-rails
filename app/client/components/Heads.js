import React from 'react';
import { StaggeredMotion, spring, presets } from 'react-motion';
import Immutable from 'immutable';
import registerComponent from './../react-automount';

const Heads = React.createClass({
  getInitialState() {
    return {x: 250, y: 300};
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

  getStyles(prevStyles) {
    const endValue = prevStyles.map((_, i) => {
      return i === 0
        ? this.state
        : {
            x: spring(prevStyles[i - 1].x, presets.gentle),
            y: spring(prevStyles[i - 1].y, presets.gentle),
          };
    });
    return endValue;
  },

  render() {
    return (
      <div>
        <StaggeredMotion
          defaultStyles={range(4).map(() => ({x: 0, y: 0}))}
          styles={this.getStyles}>
          {interpolatedStyles =>
            <div>
              {interpolatedStyles.map(({x, y}, i) =>
                <div
                  key={i}
                  className={`head head-${i}`}
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
