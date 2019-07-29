import React from 'react';
import css from './style.scss';

export const Heading = ({
  number = 1,
  title,
  paragraph
}) => {
  const Title = `h${number}`;
  return (
    <>
      <Title className={css.title}>
        {title}
      </Title>
      {paragraph && (
        <p className={css.paragraph}>
          {paragraph}
        </p>
      )}
    </>
  );
}