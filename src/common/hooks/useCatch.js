import { useState } from 'react';

export const useCatch = () => {
  const [, dispatcher] = useState();

  function dispatchError(error) {
    dispatcher(() => {
      throw error;
    });
  }

  return dispatchError;
}