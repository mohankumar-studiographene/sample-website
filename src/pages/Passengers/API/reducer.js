import ACTION_TYPE from './action-type';

const initialState = {
  passengerList: {},
  loader: true,
};

const passengerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.GET_PASSENGERS:
      return { ...state, passengerList: action.payload };

    case ACTION_TYPE.PASSENGER_LOADER:
      return { ...state, loader: action.payload };

    default:
      break;
  }
  return state;
};

export default passengerReducer;
