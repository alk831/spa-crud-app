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
      <p>{card.note}</p>
      <img
        src={card.imageUrl}
        className={css.image}
        alt={`${card.note} by ${card.creatorName}`}
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