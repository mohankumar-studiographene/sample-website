import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DataTable } from '@/components/general';

import { getPassengers } from './API/action';

import passengerStyle from './passenger.module.scss';

const INITIAL_PAGE = 0;
const INITIAL_SIZE = 10;

const Passengers = () => {
  const [filter, setFilter] = useState({
    page: INITIAL_PAGE,
    size: INITIAL_SIZE,
    column: '',
    order: 'ASC',
  });
  const dispatch = useDispatch();
  const columns = useMemo(
    () => [
      {
        Header: 'Id',
        accessor: '_id',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Trips',
        accessor: 'trips',
      },
      {
        Header: 'Slogan',
        accessor: 'airline[0].slogan',
        disableSortBy: true,
      },
    ],
    [],
  );

  const { passengerList, loader } = useSelector(({ passengerReducer }) => passengerReducer);

  useEffect(() => {
    dispatch(getPassengers(filter));
  }, [filter]);

  const handlePagination = page => {
    setFilter({ ...filter, page });
  };

  const handleSorting = ({ column_id, order }) => {
    setFilter({ ...filter, column: column_id, order });
  };
  const handleChangePaginationSize = size => {
    setFilter({ ...filter, size });
  };

  return (
    <div className={passengerStyle['post-content']}>
      <h1 className={passengerStyle.header}>Passengers</h1>
      <DataTable
        columns={columns}
        data={passengerList?.data || []}
        totalCount={passengerList?.totalPassengers}
        defaultPageSize={filter?.size}
        sortedColumn={{ column: filter?.column, order: filter?.order }}
        tableTitle="Passengers"
        customizeColumn
        tableId="passengers-table"
        loader={loader}
        handlePagination={handlePagination}
        handleChangePaginationSize={handleChangePaginationSize}
        handleSorting={handleSorting}
        modalView={true}
      />
      <h1 className={passengerStyle.header}>Passengers copy</h1>
      <DataTable
        columns={columns}
        data={passengerList?.data || []}
        totalCount={passengerList?.totalPassengers}
        defaultPageSize={filter?.size}
        sortedColumn={{ column: filter?.column, order: filter?.order }}
        tableTitle="Passengers"
        loader={loader}
        handlePagination={handlePagination}
        handleSorting={handleSorting}
        handleChangePaginationSize={handleChangePaginationSize}
        isEditable
      />
    </div>
  );
};

export default Passengers;
