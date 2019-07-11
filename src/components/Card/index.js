import React from 'react';
import css from './style.scss';
import PropTypes from 'prop-types';

export const Card = ({
  card,
  onLiked,
  onSkipped
}) => {
  return (
    <div className={css.container}>
      <p>{card.title}</p>
      <img
        src={card.img}
        className={css.image}
        alt={`${card.title} by ${card.author}`}
      />
      <button onClick={onLiked}>
        Like
      </button>
      <button onClick={onSkipped}>
        Skip
      </button>
    </div>
  );
}

Card.propTypes = {
  card: PropTypes.object.isRequired,
  onLiked: PropTypes.func.isRequired,
  onSkipped: PropTypes.func.isRequired
}