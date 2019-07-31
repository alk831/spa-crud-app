import React from 'react';
import css from './style.scss';
import PropTypes from 'prop-types';
import { Flipper, Flipped } from 'react-flip-toolkit';

export const CardsList = ({ cards, renderCard }) => (
  <Flipper flipKey={cards.length}>
    <ul className={css.cards_list}>
      {cards.map(card => (
        <Flipped
          flipId={card.id}
          key={card.id}
          className={css.cards_item}
        >
          <li>
            {renderCard(card)}
          </li>
        </Flipped>
      ))}
    </ul>
  </Flipper>
);


CardsList.propTypes = {
  cards: PropTypes.array.isRequired,
  renderCard: PropTypes.func.isRequired
}