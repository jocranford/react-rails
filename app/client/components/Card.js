import React from 'react';
import registerComponent from './../react-automount';

export default class Card extends React.Component {


  render() {
    return (
      <div className="card">
        {this.props.cardTitle}
        <button className="button delete-button" onClick={this.props.onDelete}>X</button>
      </div>
    );
  }
}

Card.propTypes = {
  cardTitle: React.PropTypes.string.isRequired,
  onDelete: React.PropTypes.func.isRequired,
};
