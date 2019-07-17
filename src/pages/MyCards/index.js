import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../store/actions';

import { Card } from '../../components/Card';

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
    return 'Loading...'
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