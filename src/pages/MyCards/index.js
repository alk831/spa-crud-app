import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../store/actions';
import css from './style.scss';

import { Card } from '../../components/Card';
import { Heading } from '../../components/Heading';

export const MyCards = () => {
  const dispatch = useDispatch();
  const likedCards = useSelector(state => state.cards.liked);
  const isLoading = useSelector(state => state.cards.isLoading);

  useEffect(() => {
    dispatch(Actions.fetchLikedCards());
  }, []);

  const handleCardDislike = (cardId) => {
    dispatch(Actions.removeLikedCard(cardId));
  }

  if (isLoading) {
    return 'Loading...';
  }

  return (
    <>
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
            hideLikeButton
            className={css.cards_item}
          />
        ))}
      </ul>
    </>
  );
}