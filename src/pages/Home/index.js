import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cardsMock from '../../__mocks__/cards.json';
import css from './style.scss';
import * as Actions from '../../store/actions';
import axios from 'axios';

import { Dashboard } from '../../layouts/Dashboard';
import { SwipeableCard } from '../../components/SwipeableCard';
import { Deck } from '../../components/SwipeableCards';
import { Heading } from '../../components/Heading';

export const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.authorization.user);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCards() {
      if (!isLoading) setIsLoading(true);
      const { data: { data }} = await axios('/cards/popular');
      setCards(data);
      setIsLoading(false);
    }
    fetchCards();
  }, []);

  const handleCardLike = (card) => {
    dispatch(Actions.saveLikedCard(card));
    removeLastCard();
  }

  const removeLastCard = () => {
    setCards(([, ...restCards]) => restCards);
  }

  if (isLoading) {
    return 'Trwa ładowanie...';
  }

  return (
    <Dashboard>
      <section className={css.section}>
        <Heading
          title="Przegladaj karty"
          paragraph="Przesuwaj karty aby je polubić lub pominąć"
        />
        <Deck cards={cards} />
      </section>
      <section className={css.section}>
        <Heading
          title="Najpopularniejsze karty"
          paragraph="Karty z największą ilością polubień"
        />
        <ul className={css.cards_list}>
          {cards.map((card, index) => (
            <li key={index} className={css.cards_item}>
              <SwipeableCard
                card={card}
                onLiked={() => handleCardLike(card)}
                onSkipped={removeLastCard}
              />
            </li>
          ))}
        </ul>
      </section>
    </Dashboard>
  );
}