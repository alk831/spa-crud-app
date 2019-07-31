import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as Actions from '../../store/actions';
import css from './style.scss';
import { useCardsFetcher } from '../../common/hooks';
import { Helmet } from 'react-helmet';
import { Card } from '../../components/Card';
import { Heading } from '../../components/Heading';
import { CardPlaceholder }  from '../../components/Placeholders';

export const MyCards = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isDataOver } = useCardsFetcher('liked');

  useEffect(() => {
    dispatch(Actions.cardsFetchRequest('liked'));
  }, []);

  const handleCardDislike = (cardId) => {
    dispatch(Actions.cardsLikedRemove(cardId));
  }

  const result = () => {
    if (isLoading) {
      return <CardPlaceholder />;
    }
    if (isDataOver) {
      return 'Nie znaleziono więcej';
    }
    return (
      <ul className={css.cards_list}>
        {data.map(card => (
          <Card
            key={card.id}
            card={card}
            onSkipped={() => handleCardDislike(card.id)}
            className={css.cards_item}
            hideLikeButton
          />
        ))}
      </ul>
    );
  }

  return (
    <>
      <Helmet>
        <title>Moje karty</title>
      </Helmet>
      <Heading
        title="Moje karty"
        paragraph="Możesz przeglądać i usuwać polubione karty"
      />
      {result()}
    </>
  );
}