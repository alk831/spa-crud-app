import {
  APP_FETCH_REQUESTED,
  APP_FETCH_FAILED,
  APP_REQUEST_FAILED
} from '../consts';

export const appFetchRequested = () => ({
  type: APP_FETCH_REQUESTED
});

export const appFetchFailed = (error) => ({
  type: APP_FETCH_FAILED,
  error
});

export const appRequestFailed = (error) => ({
  type: APP_REQUEST_FAILED,
  error
});