// Action types
const SET_STARS_DATA = 'SET_STARS_DATA';

// Action creators
export const setStars = stars => ({
  type: SET_STARS_DATA,
  stars
});

// Initial State

const initialState = [];

// Reducer

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_STARS_DATA:
      return action.stars;

    default:
      return state;
  }
}
