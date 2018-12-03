// Action types
const SET_X_Y = 'SET_X_Y';

//Action creators

export const setAxis = axis => ({
  type: SET_X_Y,
  axis
});

//InitialState
const initialState = {
  minX: 0,
  maxX: 0,
  minY: 0,
  maxY: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_X_Y:
      return {
        ...state,
        minX: action.axis.minX,
        maxX: action.axis.maxX,
        minY: action.axis.minY,
        maxY: action.axis.maxY
      };
    default:
      return state;
  }
}
