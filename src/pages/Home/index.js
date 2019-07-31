import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import css from './style.scss';
import * as Actions from '../../store/actions';
import { Helmet } from 'react-helmet';

import { Deck } from '../../components/SwipeableCards';
import { Heading } from '../../components/Heading';
import { Card } from '../../components/Card';


export const Home = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.cards.isLoading);
  const popularCards = useSelector(state => state.cards.popular);
  const cardsAreAvailable = !!popularCards.length;

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
      <Helmet>
        <title>Strona główna</title>
      </Helmet>
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
        {!cardsAreAvailable && (
          <p className={css.not_found_message}>
            Nie znaleziono więcej kart.
          </p>
        )}
        {cardsAreAvailable && (
          <ul className={css.cards_list}>
            {popularCards.map(card => (
              <li
                className={css.cards_item}
                key={card.id}
                data-testid="Home__cards-list"
              >
                <Card
                  card={card}
                  onLiked={() => handleCardLike(card)}
                  onSkipped={() => handleCardSkip(card.id)}
                  data-testid="Home__cards-item"
                />
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}