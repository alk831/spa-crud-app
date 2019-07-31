import {
  APP_ERROR_OCCURED,
} from '../consts';

const initialState = {
  error: null
}

export function applicationReducer(
  state = initialState,
  action
) {
  switch(action.type) {
    case APP_ERROR_OCCURED: return {
      ...state,
      error: action.error.message
    }
    default: return state;
  }
}