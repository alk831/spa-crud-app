import React from 'react';
import css from './style.scss';
import PropTypes from 'prop-types';

export const CardsList = ({ cards, renderCard }) => (
  <ul className={css.cards_list}>
    {cards.map(card => (
      <li key={card.id} className={css.cards_item}>
        {renderCard(card)}
      </li>
    ))}
  </ul>
);


CardsList.propTypes = {
  cards: PropTypes.array.isRequired,
  renderCard: PropTypes.func.isRequired
}