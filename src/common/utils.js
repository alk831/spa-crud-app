let timeout;

export const applyCss = (...classNames) => ({
  className: classNames
    .filter(className => typeof className === 'string' && className.length)
    .join(' ')
});

export const debounce = (fn, delay = 250) => {
  clearTimeout(timeout);
  timeout = setTimeout(fn, delay);
}

export const getAuthData = () => {
  const authData = sessionStorage.getItem('auth-data');

  if (authData) {
    return JSON.parse(authData);
  }

  return { user: {}, groups: [] };
}