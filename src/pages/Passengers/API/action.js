import apiEndPoint from '@/api/apiEndPoints';
import REQUEST from '@/api/http.service';

import ACTION_TYPE from './action-type';

export const dataLoading = (type, loadingStats) => {
  return {
    type,
    payload: loadingStats,
  };
};

export const getPassengers =
  ({ page = 0, size }) =>
  async dispatch => {
    const filterPage = `page=${page + 1}&`;
    const filterSize = size ? `size=${size}` : '';
    const filters = `${filterPage}${filterSize}`;
    dispatch(dataLoading(ACTION_TYPE.PASSENGER_LOADER, true));
    const res = await REQUEST({
      method: 'GET',
      url: `${apiEndPoint.PASSENGERS}?${filters}`,
      auth: true,
    });
    dispatch({
      type: ACTION_TYPE.GET_PASSENGERS,
      payload: res?.data || {},
    });
    dispatch(dataLoading(ACTION_TYPE.PASSENGER_LOADER, false));
  };
