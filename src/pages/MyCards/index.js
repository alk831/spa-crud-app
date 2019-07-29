import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../store/actions';
import css from './style.scss';
import { useLoadingStatus } from '../../common/hooks';
import { Helmet } from 'react-helmet';

import { Card } from '../../components/Card';
import { Heading } from '../../components/Heading';

export const MyCards = () => {
  const dispatch = useDispatch();
  const likedCards = useSelector(state => state.cards.liked);
  const isLoading = useLoadingStatus();

  useEffect(() => {
    dispatch(Actions.cardsFetchRequest('liked'));
  }, []);

  const handleCardDislike = (cardId) => {
    dispatch(Actions.cardsLikedRemove(cardId));
  }

  if (isLoading) {
    return 'Loading...';
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
      <ul className={css.cards_list}>
        {likedCards.map(card => (
          <Card
            key={card.id}
            card={card}
            onSkipped={() => handleCardDislike(card.id)}
            className={css.cards_item}
            hideLikeButton
          />
        ))}
      </ul>
    </>
  );
}