import React from 'react';
import registerComponent from './../react-automount';

export default class Card extends React.Component {
  render() {
    return (
      <div className="card" />
    );
  }
}

registerComponent('Card');
