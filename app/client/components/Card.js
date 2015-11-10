import React from 'react';

const Card = React.createClass({
  render() {
    return (
      <div className="card">
        {this.props.cardTitle}
        <button className="button delete-button" onClick={this.props.onDelete}>X</button>
      </div>
    );
  },
});

Card.propTypes = {
  cardTitle: React.PropTypes.string.isRequired,
  onDelete: React.PropTypes.func.isRequired,
};

export default Card;
