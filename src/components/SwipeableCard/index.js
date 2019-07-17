import React, { useState } from 'react';
import css from './style.scss';
import { useGesture } from 'react-use-gesture';

import { Card } from '../Card';

export const SwipeableCard = (props) => {
  const [[x, y], set] = useState([0, 0]);
  const bind = useGesture({
    onDrag({ local }) {
      set(local)
    }
  })
  return (
    <Card
      style={{ transform: `translate3d(${x}px, ${y}px, 0)`}}
      {...props}
      {...bind()}
    />
  );
}