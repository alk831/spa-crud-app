import {
  LOGIN_FAILED,
  REGISTER_FAILED,
  CARDS_FETCH_FAILED,
  ERROR_TIMED_OUT
} from '../consts';

const initialState = {
  errors: []
}

export function applicationReducer(
  state = initialState,
  action
) {
  switch(action.type) {
    case CARDS_FETCH_FAILED:
    case REGISTER_FAILED:
    case LOGIN_FAILED: return {
      ...state,
      errors: [...state.errors, action.error]
    }
    case ERROR_TIMED_OUT: return {
      ...state,
      errors: state.errors.slice(1)
    }
    default: return state;
  }
}