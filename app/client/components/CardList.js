import React from 'react';
import Immutable from 'immutable';
import registerComponent from './../react-automount';
import Card from './Card';
import createFilter from './../createFilter';

const CardList = React.createClass({
  getInitialState() {
    return {
      cards: Immutable.List(
        [createFilter()]
      ),
    };
  },

  addToDo() {
    this.setState({cards: this.state.cards.push(createFilter())});
  },

  deleteCard(index) {
    this.setState({cards: this.state.cards.remove(index)});
  },

  renderCard(card, index) {
    return (
      <Card cardTitle={card.get('title')} onDelete={() => this.deleteCard(index)} key={card.get('key')} />
    );
  },

  render() {
    return (
      <div>
        <button className="button" onClick={() => this.addToDo()}>Add To Do</button>
        {this.state.cards.map((card, index) => this.renderCard(card, index))}
      </div>
    );
  },
});

registerComponent('CardList', CardList);
