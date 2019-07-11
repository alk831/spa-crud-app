import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../store/actions';

import { Card } from '../../components/Card';

export const MyCards = () => {
  const dispatch = useDispatch();
  const likedCards = useSelector(state => state.cards.liked);

  const handleCardDislike = (cardId) => {
    dispatch(Actions.cardDisliked(cardId));
  }

  return likedCards.map(card => (
    <Card
      key={card.id}
      card={card}
      onLiked={() => {}}
      onSkipped={() => handleCardDislike(card.id)}
    />
  ));
}