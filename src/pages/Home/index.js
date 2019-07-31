import React from 'react';
import { useDispatch } from 'react-redux';
import css from './style.scss';
import * as Actions from '../../store/actions';
import { Helmet } from 'react-helmet';

import { Deck } from '../../components/SwipeableCards';
import { Heading } from '../../components/Heading';
import { Card } from '../../components/Card';
import { useCardsFetcher } from '../../common/hooks';
import { CardPlaceholder } from '../../components/Placeholders';

export const Home = () => {
  const dispatch = useDispatch();
  const {
    data,
    isLoading,
    isDataOver,
  } = useCardsFetcher('popular');

  const handleCardLike = (card) => {
    dispatch(Actions.cardsPopularLike(card));
  }

  const handleCardSkip = (cardId) => {
    dispatch(Actions.cardsPopularSkipped(cardId));
  }

  const result = () => {
    if (isLoading) {
      return <CardPlaceholder />;
    }
    if (isDataOver) {
      return (
        <p className={css.not_found_message}>
          Nie znaleziono więcej kart.
        </p>
      );
    }

    return (
      <ul className={css.cards_list}>
        {data.map(card => (
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
    );
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
        <Deck cards={data} />
      </section>
      <section className={css.section}>
        <Heading
          title="Najpopularniejsze karty"
          paragraph="Karty z największą ilością polubień"
        />
        {result()}
      </section>
    </>
  );
}