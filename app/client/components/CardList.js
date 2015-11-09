import React from 'react';
import Immutable from 'immutable';
import uniqueId from 'lodash/utility/uniqueId';
import bindAll from 'lodash/function/bindAll';
import registerComponent from './../react-automount';
import faker from 'faker';
import Card from './Card';

function createFilter() {
  return Immutable.fromJS({
    title: `${faker.hacker.verb()} ${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    key: uniqueId(),
  });
}

export default class CardList extends React.Component {
  constructor(props) {
    super(props);
    bindAll(this);

    this.state = {
      cards: Immutable.List(
        [createFilter()]
      ),
    };
  }

  addToDo(e) {
    this.setState({cards: this.state.cards.push(createFilter())});
  }

  renderCard(card) {
    return (
      <Card cardTitle={card.get('title')} onDelete={this.deleteCard} />
    );
  }

  render() {
    return (
      <div>
        {this.state.cards.map((card) => this.renderCard(card))}
        <button className="button" onClick={() => this.addToDo()}>Add To Do</button>
      </div>
    );
  }
}

registerComponent('CardList', CardList);
