import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import css from './style.scss';
import * as Actions from '../../store/actions';
import axios from 'axios';

import { SwipeableCard } from '../../components/SwipeableCard';
import { Deck } from '../../components/SwipeableCards';
import { Heading } from '../../components/Heading';

export const Home = () => {
  const dispatch = useDispatch();
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
    <>
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
          {cards.map(card => (
            <li
              className={css.cards_item}
              key={card.id}
              data-testid="Home__cards-list"
            >
              <SwipeableCard
                card={card}
                onLiked={() => handleCardLike(card)}
                onSkipped={removeLastCard}
                data-testid="Home__cards-item"
              />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}