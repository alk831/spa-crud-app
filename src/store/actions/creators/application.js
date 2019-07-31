import {
  APP_FETCH_REQUESTED,
  APP_FETCH_FAILED,
  APP_REQUEST_FAILED,
  APP_ERROR_OCCURED
} from '../../consts';

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

export const appErrorOccured = (error) => ({
  type: APP_ERROR_OCCURED,
  error
});