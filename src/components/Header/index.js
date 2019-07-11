import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Logowanie</Link>
        </li>
        <li>
          <Link to="/register">Rejestracja</Link>
        </li>
        <li>
          <Link to="/my-cards">Polubione karty</Link>
        </li>
      </ul>
    </nav>
  );
}