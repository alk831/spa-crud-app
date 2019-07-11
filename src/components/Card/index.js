import React from 'react';
import css from './style.scss';
import PropTypes from 'prop-types';

export const Card = ({
  card
}) => {
  return (
    <div className={css.container}>
      {card.title}
      <img
        src={card.img}
        alt={`${card.title} by ${card.author}`}
      />
    </div>
  );
}

Card.propTypes = {
  card: PropTypes.object.isRequired
}