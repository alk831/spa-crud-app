import React from 'react';
import { useSelector } from 'react-redux';

export const Home = () => {
  const user = useSelector(state => state.authorization.user);
  return (
    <div>Witaj {user.email}</div>
  );
}