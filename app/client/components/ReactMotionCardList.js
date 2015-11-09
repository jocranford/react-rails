import React from 'react';
import { Motion, spring, presets } from 'react-motion';
import Immutable from 'immutable';
import bindAll from 'lodash/function/bindAll';
import registerComponent from './../react-automount';
import Card from './Card';
import createFilter from './../createFilter';


// const CardTransition = {
//   willEnter(key, style) {

//   }

//   willLeave(key, style) {

//   }

//   getStyles(cards) {

//   }
// }

export default class ReactMotionCardList extends React.Component {
  constructor(props, index) {
    super(props);
    bindAll(this);

    this.state = {
      cards: Immutable.List(
        [createFilter()]
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
        <Motion defaultStyle={{height: 0, width: 0}} style={{height: spring(30, presets.stiff), width: spring(330, presets.wobbly)}}>
          {interpolatedStyle => <div style={{overflow: 'hidden', whitespace: 'nowrap', height: interpolatedStyle.height, width: interpolatedStyle.width}}>
            <button className="button" onClick={() => this.addToDo()}>Add To Do</button>
            <button className="button" onClick={() => this.addManyToDos()}>Get A Lot To Do</button>
          </div>}
        </Motion>
      </div>
    );
  }
}

registerComponent('ReactMotionCardList', ReactMotionCardList);
