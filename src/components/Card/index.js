import React from 'react';
import css from './style.scss';
import PropTypes from 'prop-types';
import HeartIcon from '../../assets/img/heart.svg';
import NextIcon from '../../assets/img/next.svg';

import { RoundedButton } from '../RoundedButton';

export const Card = ({
  card,
  onLiked,
  onSkipped,
  ...props
}) => {
  return (
    <figure
      className={css.container}
      {...props}
    >
      <img
        src={card.imageUrl}
        className={css.image}
        alt={`${card.note} by ${card.creatorName}`}
      />
      <div className={css.info_container}>
        <div className={css.info_content}>
          <div>
            <figcaption className={css.info_title}>
              <a href={card.url}>
                Mobile application - Ceramic shop
              </a>
            </figcaption>
            <a href={card.creatorUrl} className={css.info_author}>
              Outcrowd
            </a>
          </div>
          <div className={css.buttons_container}>
            <RoundedButton
              icon={NextIcon}
              mode="skip"
              onClick={onSkipped}
            />
            <RoundedButton
              icon={HeartIcon}
              mode="like"
              onClick={onLiked}
            />
          </div>
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