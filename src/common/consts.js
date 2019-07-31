export const NODE_ENV = process.env.NODE_ENV || 'production';
export const isDevelopment = NODE_ENV === 'development';
export const HOST = isDevelopment ? 'http://localhost:3000' : process.env.API_HOST;
export const AUTH_DATA = 'auth-data';
export const GROUP = {
  NONE: null,
  USER: 'user',
  MODERATOR: 'moderator',
  ADMIN: 'admin'
}