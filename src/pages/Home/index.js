import React from 'react';
import { useSelector } from 'react-redux';
import { Card } from '../../components/Card';
import cards from '../../__mocks__/cards.json';

export const Home = () => {
  const user = useSelector(state => state.authorization.user);
  return (
    <>
      <div>Witaj {user.email}</div>
      {cards.map(card => (
        <Card card={card} key={card.id} />
      ))}
    </>
  );
}