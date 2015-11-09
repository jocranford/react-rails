import React from 'react';
import { Motion, spring, presets } from 'react-motion';
import Immutable from 'immutable';
import registerComponent from './../react-automount';

const MotionSprings = React.createClass({
  getInitialState() {
    return {
      stiffness: 170,
      damping: 26,
      elements: Immutable.List(),
      colors: ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']
    };
  },

  handleChangeStiffness(e) {
    this.setState({stiffness: e.target.value});
  },

  handleChangeDamping(e) {
    this.setState({damping: e.target.value});
  },

  handleAddMotionElement() {
    this.setState({elements: this.state.elements.push(this.createElement())})
  },

  createElement() {
    return Immutable.fromJS({
      stiffness: this.state.stiffness,
      damping: this.state.damping,
    });
  },

  renderMotionElement(element, index) {
    const stiffness = parseInt(element.get('stiffness'));
    const damping = parseInt(element.get('damping'));
    return (
      <Motion defaultStyle={{height: 0, width: 0}} style={{height: spring(100, [stiffness, damping]), width: spring(100, [stiffness, damping])}}>
        {interpolatedStyle => <div style={{overflow: 'hidden', display: 'inline-block', height: interpolatedStyle.height, width: interpolatedStyle.width, backgroundColor: this.state.colors[index % 7]}}>
        </div>}
      </Motion>
    );
  },

  render() {
    return (
      <div>
        <label>
          <div className="label">Stiffness</div>
          <input name="stiffness" onChange={this.handleChangeStiffness} value={this.state.stiffness} />
        </label>
        <label>
          <div className="label">Damping</div>
          <input name="damping" onChange={this.handleChangeDamping} value={this.state.damping}/>
        </label>
        <button className="button" onClick={this.handleAddMotionElement}>Add Element</button>
        <div>
          {this.state.elements.map((element, index) => this.renderMotionElement(element, index))}
        </div>
      </div>
    );
  },
});

registerComponent('MotionSprings', MotionSprings);
