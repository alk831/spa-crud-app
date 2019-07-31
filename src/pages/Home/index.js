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
import { CardsList } from '../../components/CardsList';
import { InfoMessage } from '../../components/InfoMessage';

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
      return <InfoMessage text="Nie znaleziono więcej kart" />;
    }
    return (
      <CardsList
        cards={data}
        renderCard={card => (
          <Card
            card={card}
            onLiked={() => handleCardLike(card)}
            onSkipped={() => handleCardSkip(card.id)}
          />
        )}
      />
    );
  }

  return (
    <>
      <Helmet>
        <title>Strona główna</title>
      </Helmet>
      <Heading
        title="Najpopularniejsze karty"
        paragraph="Karty z największą ilością polubień"
      />
      {result()}
    </>
  );
}