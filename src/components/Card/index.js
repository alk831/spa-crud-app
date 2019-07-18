import React, { useState } from 'react';
import css from './style.scss';
import PropTypes from 'prop-types';
import Heart from '../../assets/img/heart.svg';

import { RoundedButton } from '../RoundedButton';

export const Card = ({
  card,
  onLiked,
  onSkipped,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <figure
      className={css.container}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <img
        src={card.imageUrl}
        className={css.image}
        alt={`${card.note} by ${card.creatorName}`}
      />
      <div className={css.info_container}>
        <div className={css.info_content}>
          <figcaption className={css.info_title}>
            <a href={card.url}>
              Mobile application - Ceramic shop
            </a>
          </figcaption>
          <a href={card.creatorUrl} className={css.info_author}>
            Outcrowd
          </a>
          <RoundedButton
            icon={Heart}
            theme="rose"
          />
        </div>
      </div>
    </figure>
  );
}

Card.propTypes = {
  card: PropTypes.object.isRequired,
  onLiked: PropTypes.func.isRequired,
  onSkipped: PropTypes.func.isRequired
}