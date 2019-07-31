import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as Actions from '../../store/actions';
import { useCardsFetcher } from '../../common/hooks';
import { Helmet } from 'react-helmet';
import { Card } from '../../components/Card';
import { Heading } from '../../components/Heading';
import { CardPlaceholder }  from '../../components/Placeholders';
import { CardsList } from '../../components/CardsList';
import { InfoMessage } from '../../components/InfoMessage';

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
      return <InfoMessage text="Nie polubiłeś żadnych kart" />
    }
    return (
      <CardsList
        cards={data}
        renderCard={card => (
          <Card
            card={card}
            onSkipped={() => handleCardDislike(card.id)}
            hideLikeButton
          />
        )}
      />
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