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
      </ul>
    </nav>
  );
}