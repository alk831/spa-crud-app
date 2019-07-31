import React from 'react';
import css from './style.scss';
import PropTypes from 'prop-types';
import { Flipper, Flipped } from 'react-flip-toolkit';

export const CardsList = ({ cards, renderCard }) => (
  <Flipper flipKey={cards.length}>
    <ul className={css.cards_list}>
      {cards.map(card => (
        <li className={css.cards_item} key={card.id}>
          <Flipped flipId={card.id.toString()}>
            {renderCard(card)}
          </Flipped>
        </li>
      ))}
    </ul>
  </Flipper>
);


CardsList.propTypes = {
  cards: PropTypes.array.isRequired,
  renderCard: PropTypes.func.isRequired
}