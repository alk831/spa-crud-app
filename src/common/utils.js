
export const applyCss = (...classNames) => ({
  className: classNames
    .filter(className => typeof className === 'string' && className.length)
    .join(' ')
});