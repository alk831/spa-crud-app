import React, { useState, useMemo } from 'react';

const defaultData = {
  isLoggedIn: false,
  token: null,
  tokenExp: null,
  role: 'guest'
}

export const AuthorizationContext = React.createContext(defaultData);

export const AuthorizationProvider = ({ children }) => {
  const [authData, setAuthData] = useState(() => {
    const savedData = localStorage.getItem('auth-data');

    if (savedData != null) {
      const { token, tokenExp, role } = JSON.parse(savedData);
      const parsedTokenExp = Number(tokenExp);
      const currentTs = Math.floor(Date.now() / 100);

      if (currentTs >= parsedTokenExp) {
        return defaultData;
      }

      return {
        isLoggedIn: true,
        token,
        tokenExp,
        role
      }
    }

    return defaultData;
  });

  const memoizedState = useMemo(
    () => [authData, setAuthData],
    [authData, setAuthData]
  );

  return (
    <AuthorizationContext.Provider value={memoizedState}>
      {children}
    </AuthorizationContext.Provider>    
  );
}