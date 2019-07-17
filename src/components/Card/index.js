import React from 'react';
import css from './style.scss';
import PropTypes from 'prop-types';

export const Card = ({
  card,
  onLiked,
  onSkipped,
  ...props
}) => {
  return (
    <figure className={css.container} {...props}>
      <figcaption className={css.title}>
        {card.note}
      </figcaption>
      <img
        src={card.imageUrl}
        className={css.image}
        alt={`${card.note} by ${card.creatorName}`}
      />
      {/* <button onClick={onLiked}>
        Like
      </button>
      <button onClick={onSkipped}>
        Skip
      </button> */}
    </figure>
  );
}

Card.propTypes = {
  card: PropTypes.object.isRequired,
  onLiked: PropTypes.func.isRequired,
  onSkipped: PropTypes.func.isRequired
}