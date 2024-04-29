import { combineReducers } from 'redux';

import passengerReducer from '@/pages/Passengers/API/reducer';

const reducer = combineReducers({ passengerReducer });

export default reducer;
