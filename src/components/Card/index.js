import React from 'react';
import css from './style.scss';
import PropTypes from 'prop-types';
import HeartIcon from '../../assets/img/heart.svg';
import NextIcon from '../../assets/img/next.svg';
import { applyCss } from '../../common/utils';

import { RoundedButton } from '../RoundedButton';

export const Card = ({
  card,
  onLiked,
  onSkipped,
  className,
  hideLikeButton,
  ...props
}) => {
  return (
    <figure
      data-testid="Card"
      {...applyCss(
        css.container,
        className
      )}
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
              <a
                href={card.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {card.note}
              </a>
            </figcaption>
            <a
              href={card.creatorUrl}
              className={css.info_author}
              title={`Strona twórcy - ${card.creatorName}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {card.creatorName}
            </a>
          </div>
          <div className={css.buttons_container}>
            <RoundedButton
              icon={NextIcon}
              mode="skip"
              title="Pomiń"
              onClick={onSkipped}
            />
            {!hideLikeButton && (
              <RoundedButton
                icon={HeartIcon}
                mode="like"
                title="Polub"
                onClick={onLiked}
              />
            )}
          </div>
        </div>
      </div>
    </figure>
  );
}

Card.propTypes = {
  card: PropTypes.object.isRequired,
  onLiked: PropTypes.func,
  onSkipped: PropTypes.func,
  hideLikeButton: PropTypes.bool
}