import React from 'react/addons';
import Immutable from 'immutable';
import bindAll from 'lodash/function/bindAll';
import registerComponent from './../react-automount';
import Card from './Card';
import createFilter from './../createFilter';

const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export default class CssTransitionCardList extends React.Component {
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

  deleteCard(index) {
    this.setState({cards: this.state.cards.remove(index)});
  }

  renderCard(card, index) {
    return (
      <div className="card-wrapper" key={card.get('key')}>
        <Card cardTitle={card.get('title')} onDelete={() => this.deleteCard(index)} />
      </div>
    );
  }

  render() {
    return (
      <div>
        <button className="button" onClick={() => this.addToDo()}>Add To Do</button>
        <ReactCSSTransitionGroup transitionName="card">
          {this.state.cards.map((card, index) => this.renderCard(card, index))}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

registerComponent('CssTransitionCardList', CssTransitionCardList);
