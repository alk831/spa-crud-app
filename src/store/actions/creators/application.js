import {
  APP_ERROR_OCCURED,
} from '../../consts';

export const appErrorOccured = (error) => ({
  type: APP_ERROR_OCCURED,
  error
});