export const NODE_ENV = process.env.NODE_ENV || 'production';
export const isDevelopment = NODE_ENV === 'development';
export const HOST = isDevelopment ? 'http://localhost:3000' : process.env.API_HOST;
export const AUTH_DATA = 'auth-data';

const NONE = null;
const USER = 'user';
const MODERATOR = 'moderator';
const ADMIN = 'admin';

export const GROUP = {
  NONE,
  USER,
  MODERATOR,
  ADMIN
}