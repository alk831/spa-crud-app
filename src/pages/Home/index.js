import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import css from './style.scss';
import * as Actions from '../../store/actions';

import { SwipeableCard } from '../../components/SwipeableCard';
import { Deck } from '../../components/SwipeableCards';
import { Heading } from '../../components/Heading';


export const Home = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.cards.isLoading);
  const popularCards = useSelector(state => state.cards.popular);

  useEffect(() => {
    dispatch(Actions.cardsFetchRequest('popular'))
  }, []);
  useEffect(() => {
    if (!isLoading && popularCards.length === 0) {
      dispatch(Actions.cardsFetchRequestMore('popular'));
    }
  }, [popularCards]);

  const handleCardLike = (card) => {
    dispatch(Actions.cardsPopularLike(card));
  }

  const handleCardSkip = (cardId) => {
    dispatch(Actions.cardsPopularSkipped(cardId));
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
        <Deck cards={popularCards} />
      </section>
      <section className={css.section}>
        <Heading
          title="Najpopularniejsze karty"
          paragraph="Karty z największą ilością polubień"
        />
        <ul className={css.cards_list}>
          {popularCards.map(card => (
            <li
              className={css.cards_item}
              key={card.id}
              data-testid="Home__cards-list"
            >
              <SwipeableCard
                card={card}
                onLiked={() => handleCardLike(card)}
                onSkipped={() => handleCardSkip(card.id)}
                data-testid="Home__cards-item"
              />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}