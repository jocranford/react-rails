import React from 'react';
import { TransitionMotion, spring, presets } from 'react-motion';
import Immutable from 'immutable';
import Card from './Card';
import bindAll from 'lodash/function/bindAll';
import registerComponent from './../react-automount';
import createFilter from './../createFilter';

const HEIGHT = 60;

const CardTransition = {
  willEnter(key, style) {
    return {
      ...style,
      height: spring(0, [200, 10])
    };
  },

  willLeave(key, style) {
    return {
      ...style,
      height: spring(0, [200, 26])
    };
  },

  getStyles(cards) {
    const configs = {};
    cards.forEach((card, cardIndex) => {
      configs[String(card.get('key'))] = {
        card,
        cardIndex,
        height: spring(HEIGHT, [200, 10]),
      };
    });
    return configs;
  },
};

const ReactMotionCardList = React.createClass({
  getInitialState() {
    return {
      cards: Immutable.List([createFilter()]),
    };
  },

  addToDo() {
    this.setState({cards: this.state.cards.push(createFilter())});
  },

  deleteCard(index) {
    this.setState({cards: this.state.cards.remove(index)});
  },

  renderCard({card, cardIndex, height}) {
    return (
      <div style={{height: height, overflow: 'hidden'}}>
        <Card cardTitle={card.get('title')} onDelete={() => this.deleteCard(cardIndex)} key={card.get('key')} />
      </div>
    );
  },

  render() {
    return (
      <div>
        <button className="button" onClick={() => this.addToDo()}>Add To Do</button>
        <TransitionMotion
          styles={CardTransition.getStyles(this.state.cards)}
          willEnter={CardTransition.willEnter}
          willLeave={CardTransition.willLeave}
        >
          {
            (styles) => (
              <div>
                {Object.keys(styles).map((key) => this.renderCard(styles[key]))}
              </div>
            )
          }
        </TransitionMotion>
      </div>
    );
  },
});

registerComponent('ReactMotionCardList', ReactMotionCardList);
