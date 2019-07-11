import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from '../../components/Card';
import cardsMock from '../../__mocks__/cards.json';
import css from './style.scss';
import * as Actions from '../../store/actions';

export const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.authorization.user);
  const [cards, setCards] = useState(() => cardsMock);

  const handleCardLike = (card) => {
    dispatch(Actions.cardLiked(card));
    removeLastCard();
  }

  const removeLastCard = () => {
    setCards(([, ...restCards]) => restCards);
  }

  return (
    <>
      <div>Witaj {user.email}</div>
      <ul className={css.cards_list}>
        {cards.map(card => (
          <li key={card.id} className={css.cards_item}>
            <Card
              card={card}
              onLiked={() => handleCardLike(card)}
              onSkipped={removeLastCard}  
            />
          </li>
        ))}
      </ul>
    </>
  );
}