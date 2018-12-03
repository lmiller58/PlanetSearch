import { bindActionCreators } from 'redux';

// Action types
const SET_SYSTEM_DATA = 'SET_SYSTEM_DATA';

// Creators

export const setSystem = system => ({
  type: SET_SYSTEM_DATA,
  system
});

const initialState = {};

// Reducer

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SYSTEM_DATA:
      return action.system;
    default:
      return state;
  }
}
