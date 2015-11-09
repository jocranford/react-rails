import React from 'react';
import { Motion, spring, presets } from 'react-motion';
import Immutable from 'immutable';
import uniqueId from 'lodash/utility/uniqueId';
import bindAll from 'lodash/function/bindAll';
import registerComponent from './../react-automount';
import faker from 'faker';
import Card from './Card';
import createFilter from './../createFilter';

export default class ReactMotionAndStaggeredMotion extends React.Component {
  constructor(props, index) {
    super(props);
    bindAll(this);

    this.state = {
      cards: Immutable.List(
        [
          createFilter(),
          createFilter(),
          createFilter(),
          createFilter(),
          createFilter(),
        ]
      ),
    };
  }

  addToDo() {
    this.setState({cards: this.state.cards.push(createFilter())});
  }

  addManyToDos() {
    this.setState({cards: this.state.cards.push(createFilter(), createFilter(), createFilter(), createFilter(), createFilter())});
  }

  deleteCard(index) {
    this.setState({cards: this.state.cards.remove(index)});
  }

  renderCard({card, cardIndex, maxHeight}) {
    return (
      <Card cardTitle={card.get('title')} onDelete={() => this.deleteCard(index)} key={card.get('key')} />
    );
  }

  render() {
    return (
      <div>

      <Motion defaultStyle={{height: 0, width: 0}} style={{height: spring(30, [1500, 20]), width: spring(170, [1500, 20])}}>
          {interpolatedStyle => <div style={{overflow: 'hidden', whitespace: 'nowrap', height: interpolatedStyle.height, width: interpolatedStyle.width}}>
            <button className="button" onClick={() => this.addToDo()}>Add To Do</button>
          </div>}
        </Motion>
      </div>
    );
  }
}

registerComponent('ReactMotionAndStaggeredMotion', ReactMotionAndStaggeredMotion);
