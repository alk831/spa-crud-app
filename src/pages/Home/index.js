import React from 'react';
import { useSelector } from 'react-redux';
import { Card } from '../../components/Card';
import cards from '../../__mocks__/cards.json';
import css from './style.scss';

export const Home = () => {
  const user = useSelector(state => state.authorization.user);
  return (
    <>
      <div>Witaj {user.email}</div>
      <ul className={css.cards_list}>
        {cards.map(card => (
          <li key={card.id} className={css.cards_item}>
            <Card card={card} />
          </li>
        ))}
      </ul>
    </>
  );
}