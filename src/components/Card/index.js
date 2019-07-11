import React from 'react';
import css from './style.scss';
import PropTypes from 'prop-types';

export const Card = ({
  card
}) => {
  return (
    <div className={css.container}>
      <p>{card.title}</p>
      <img
        src={card.img}
        className={css.image}
        alt={`${card.title} by ${card.author}`}
      />
    </div>
  );
}

Card.propTypes = {
  card: PropTypes.object.isRequired
}