import { AUTH_DATA } from './consts';

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
  const authData = sessionStorage.getItem(AUTH_DATA);

  if (authData) {
    const { user, ...data } = JSON.parse(authData);
    return {
      ...data,
      group: user.group,
      user
    }
  }

  return { user: null, groups: [], group: null };
}

export const parseCardsTarget = (target) => {
  const availableTargets = ['popular', 'liked'];

  if (!availableTargets.includes(target)) {
    throw new Error(
      `Invalid target type. Must be one of: ${availableTargets.join(', ')}.`
    );
  }

  const parsedTarget = target === 'liked' ? 'favorite' : 'popular';
  return parsedTarget;
}