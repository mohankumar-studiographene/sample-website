/* eslint-disable no-nested-ternary */
import { Fragment, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useColumnOrder, useExpanded, useFilters, usePagination, useTable } from 'react-table';
import cx from 'classnames';

import { Button, Checkbox, OutsideClickHandler } from '@/components/general';
import { isNumber } from '@/utils/common';

import Dropdown from '../Dropdown';

import SortingIcon from './SortingIcon';

import tableStyle from './table.module.scss';

const ASC = 'ASC';
const DESC = 'DESC';
const ALL_SELECTED_LABEL = 'Show/hide columns';
const rowLengthOptions = [
  { value: 5, label: '5' },
  { value: 10, label: '10' },
  { value: 30, label: '30' },
  { value: 50, label: '50' },
  { value: 100, label: '100' },
];

// Enable cursor pointer on particular column we can pass it in columns form your individual component. for ref TaskTemplate
const DataTable = props => {
  const {
    columns = [],
    data = [],
    defaultPageSize = 10,
    totalCount, // total count of data
    tableTitle = '',
    showTableTitle = true,
    loader = true,
    sorting = true,
    sortedColumn = {}, // { column: 'taskTitle', order:DESC } // it Will be used for sorting order highlight
    customFilter = { key: '', value: '' }, // { key: 'taskTitle', value: 'task' } Custom filter use for handle outside search
    customizeColumn = false, // It enable hide and show column Dropdown(User can customize column according to screen view area)
    tableId = '', // tableId is required for preserve customize columns by user.
    pagination = true,
    hidePaginationOption = false,
    className = '',
    paginationMenuPlacement = 'top',
    isEditable = false,
    expandedRow = false,
    readOnly = false,
    isView = false, // for change edit con to view(eye) icon
    handlePagination = () => {},
    handleSorting = () => {},
    handleFormModal = () => {},
    handleRowDetails = () => {}, // function to handle  click on row cell and it return event target,cell index and row data
    handleChangePaginationSize, // function to handle change pagination size
    defaultExpanded = {},
    handleTableScroll = () => {},
    renderRowSubComponent,
    expandedDiv,
    modalView, // if modalView will true then it check row length. row length less than 5 then pagination dropdown placement will be down
  } = props;
  const [sortBy, setSortBy] = useState({});
  const [tableData, setTableData] = useState([]);
  const [rowLength, setRowLength] = useState(rowLengthOptions[0]);
  const [pageNo, setPageNo] = useState(0);
  const [isActiveDDMenu, handleDDMenu] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState([]);
  // for set dropdown label
  const [tempCheckedColumn, setTempCheckedColumn] = useState([]);
  const [selectedDropdownLabel, setSelectedDropdownLabel] = useState(ALL_SELECTED_LABEL);
  const [tableColumns, setTableColumns] = useState([]);
  const [visibleColumnsCount, setVisibleColumnsCount] = useState(0);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    visibleColumns,
    pageOptions,
    setFilter,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    setHiddenColumns,
    state: { pageIndex },
  } = useTable(
    {
      columns: tableColumns,
      data: tableData,
      initialState: {
        pageIndex: pageNo,
        pageSize: defaultPageSize,
        expanded: defaultExpanded,
        hiddenColumns: selectedColumn,
      },

      manualPagination: true,
      pageCount: Math.ceil(totalCount / defaultPageSize),
      isColumnSort: false,
    },
    useFilters,
    useColumnOrder,
    useExpanded,
    usePagination,
  );
  // Handle customize column
  useEffect(() => {
    setVisibleColumnsCount(
      columns?.filter(
        col => col?.Header !== '' && !col?.excludeHeader && typeof col?.Header === 'string',
      ).length,
    );
    const rev_selected_cols = JSON.parse(localStorage.getItem(tableId)) || [];
    setSelectedColumn(rev_selected_cols);
    setTempCheckedColumn(rev_selected_cols);
    let colsCopy = [...columns];
    if (customizeColumn && tableId) {
      colsCopy = columns?.map(column => {
        if (rev_selected_cols?.includes(column.accessor)) return { ...column, showCol: false };
        return { ...column, showCol: true };
      });
    }
    setTableColumns(colsCopy);
  }, [columns]);

  // After select custom columns and apply to show only those columns
  useEffect(() => {
    setSelectedDropdownLabel(
      selectedColumn?.length === 0
        ? ALL_SELECTED_LABEL
        : `${visibleColumnsCount - selectedColumn?.length} Columns selected`,
    );
    setHiddenColumns(selectedColumn);
  }, [selectedColumn]);

  useEffect(() => {
    const selectLength = rowLengthOptions.find(item => item.value === defaultPageSize);
    if (selectLength) setRowLength(selectLength);
    else setRowLength(rowLengthOptions[0]);
  }, [defaultPageSize]);

  useEffect(() => {
    if (data.length) {
      setTableData(data);
    } else {
      // for show no result found
      const dummyArray = [];
      const rowCount = defaultPageSize || 6;
      for (let i = 1; i <= rowCount; i += 1) dummyArray.push({});
      setTableData(dummyArray);
    }
  }, [data]);

  useEffect(() => {
    if (sortedColumn.column !== sortBy.column || sortedColumn.order !== sortBy.order)
      setSortBy(sortedColumn);
  }, [sortedColumn]);

  // handle outside filter/Custom filter
  useEffect(() => {
    let columnExist = false;
    columns?.forEach(element => {
      if (element.accessor === customFilter.key) columnExist = true;
      if (element?.columns?.length) {
        element.columns.forEach(el => {
          if (el.accessor === customFilter.key) columnExist = true;
        });
      }
    });
    if (
      columnExist &&
      customFilter.value !== null &&
      customFilter.value !== undefined &&
      customFilter.value
    ) {
      setFilter(customFilter.key, customFilter.value);
    }
  }, [customFilter]);

  useEffect(() => {
    if (customizeColumn && tableId.trim() === '') throw new Error('tableId is  required');
  }, [customizeColumn]);

  const getPureName = str => {
    const reg = new RegExp(/^(.*)[_0-9]+$/);
    if (str?.includes('_') && reg.test(str)) return str.replace(/_\d/, '');
    return str;
  };
  const toUpperCaseString = str => {
    if (str && typeof str === 'string') return str?.toUpperCase();
    return str;
  };

  const handleSortBy = column => {
    if (!column?.disableSortBy && data.length !== 0 && column?.id !== '') {
      let column_id = getPureName(column?.id);
      let order = DESC;
      if (Object.prototype.hasOwnProperty.call(column, 'columns')) {
        const column_index = column_id.split('_').slice(-1).pop();
        if (isNumber(column_index)) column_id = getPureName(column.columns[0]?.id);
      }
      if (column_id === getPureName(sortBy.column))
        order = toUpperCaseString(sortBy.order) === ASC ? DESC : ASC;
      setSortBy({
        column: column_id,
        order,
      });
      handleSorting({ column, column_id, order });
    }
  };

  const handleRowSizeChange = data => {
    setRowLength(data);
    handleChangePaginationSize(data.value);
  };

  const changePagination = page => {
    handlePagination(page);
    setPageNo(page);
  };

  const entryDetails = () => {
    const pageSize = parseInt(defaultPageSize, 10);
    const limit = pageSize * pageIndex + 1;
    let offset = pageSize * pageIndex + pageSize;
    if (offset > totalCount) offset = totalCount;
    return `<span class="${tableStyle['for-web-lsp']}">Showing ${limit} to
    ${offset} of ${totalCount} rows</span>
    <span class="${tableStyle['for-portrait-mob']}">${limit}-${offset} / ${totalCount}</span>`;
  };

  // Handle customize column
  const handleColumnSlDropDown = () => {
    handleDDMenu(!isActiveDDMenu);
  };

  const handleColumnSelect = e => {
    const { checked, id } = e?.target;
    // tempCheckedColumn for handle select all checkbox
    const temp_columns = [...tempCheckedColumn];
    if (checked) temp_columns.splice(temp_columns?.indexOf(id), 1);
    else temp_columns.push(id);
    setTempCheckedColumn([...new Set(temp_columns)]);

    let colsCopy = [...tableColumns];
    colsCopy = tableColumns?.map(column => {
      if (column.accessor === id && checked) return { ...column, showCol: true };
      if (column.accessor === id && !checked) return { ...column, showCol: false };
      return column;
    });
    setTableColumns(colsCopy);
  };

  const handleAllSelectColumn = e => {
    const { checked } = e?.target;
    if (checked) {
      let colsCopy = [...tableColumns];
      colsCopy = tableColumns?.map(column => {
        return { ...column, showCol: true };
      });
      setTableColumns(colsCopy);
      setTempCheckedColumn([]);
    }
  };

  const applyColumnSelect = () => {
    const selCol = tableColumns?.map(cols => !cols.showCol && cols.accessor).filter(item => item);
    setSelectedColumn(selCol);
    localStorage.setItem(tableId, JSON.stringify(selCol));
    setSelectedDropdownLabel(
      selCol?.length === 0
        ? ALL_SELECTED_LABEL
        : `${visibleColumnsCount - selCol?.length} Columns selected`,
    );
    handleDDMenu(!isActiveDDMenu);
  };

  // Handle inside table scroll
  const handleScroll = e => {
    handleTableScroll(e);
  };

  // Render the UI for your table
  return (
    <>
      {showTableTitle && (
        <div
          className={cx(
            tableStyle['table-header'],
            'd-flex align-items-center justify-content-between data-table-header',
          )}
        >
          <span className={tableStyle['table-heading']}>{tableTitle}</span>
          {customizeColumn && (
            <div className={tableStyle['select-columns-wrp']}>
              <button
                onClick={handleColumnSlDropDown}
                className={cx(
                  tableStyle['sc-ddm-trigger'],
                  {
                    [tableStyle['sc-ddm-expand']]: isActiveDDMenu,
                  },
                  {
                    [tableStyle['ddm-active-button']]: selectedDropdownLabel !== ALL_SELECTED_LABEL,
                  },
                )}
              >
                <span>|||</span>
                <span className={tableStyle['btn-text']}>{selectedDropdownLabel}</span>
              </button>
              <OutsideClickHandler
                disabled={!isActiveDDMenu}
                onOutsideClick={() => {
                  handleDDMenu(false);
                }}
              >
                {isActiveDDMenu && (
                  <div className={tableStyle['tc-dropdown-menu']}>
                    <div className={tableStyle['col-opt-wrp']}>
                      <ul>
                        <li
                          className={cx(tableStyle['select-all-btn'], {
                            [tableStyle['tbl-checkbox-disable']]: !tempCheckedColumn?.length,
                          })}
                        >
                          <Checkbox
                            label="All"
                            id="allColSelected"
                            className={tableStyle['tbl-checkbox']}
                            onChange={handleAllSelectColumn}
                            disabled={!tempCheckedColumn?.length}
                            checked={!tempCheckedColumn?.length}
                          />
                        </li>
                        {tableColumns.map(column => (
                          // eslint-disable-next-line react/jsx-no-useless-fragment
                          <>
                            {column?.Header &&
                            !column?.excludeHeader &&
                            typeof column?.Header === 'string' ? (
                              <li key={column.accessor}>
                                <Checkbox
                                  label={column?.Header}
                                  id={column.accessor}
                                  checked={column?.showCol}
                                  className={tableStyle['tbl-checkbox']}
                                  onChange={handleColumnSelect}
                                />
                              </li>
                            ) : null}
                          </>
                        ))}
                      </ul>
                    </div>
                    <Button
                      type={1}
                      className={tableStyle['sl-col-apply']}
                      label="Apply"
                      onClick={applyColumnSelect}
                    />
                  </div>
                )}
              </OutsideClickHandler>
            </div>
          )}
        </div>
      )}
      <div
        className={cx(
          'position-relative',
          'data-table-container',
          showTableTitle ? tableStyle['table-overflow-scroll'] : null,
        )}
        onScroll={handleScroll}
      >
        {/* Data not found */}
        {data?.length === 0 && !loader ? (
          <div className={tableStyle['no-data-found']}>No Data Found!</div>
        ) : null}

        <table {...getTableProps()} className={cx(tableStyle.table, className)}>
          <thead>
            {headerGroups.map((headerGroup, i) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={`header-${i}`} className="table-row">
                {headerGroup?.headers?.map(column => {
                  return (
                    <th
                      width={column?.width}
                      {...column.getHeaderProps()}
                      key={`header-${column?.id}`}
                      className={cx(
                        'table-heading',
                        {
                          'cursor-pointer': !column.disableSortBy && data.length !== 0,
                        },
                        {
                          [tableStyle['disable-click']]: loader,
                        },
                      )}
                      onClick={() => handleSortBy(column)}
                    >
                      <span>{column.render('Header')}</span>
                      {/* Sorting icons */}
                      {sorting &&
                        data?.length !== 0 &&
                        column.Header &&
                        column.disableSortBy !== 'undefined' &&
                        !column.disableSortBy &&
                        !loader && (
                          <span className={tableStyle['table-sort-icon-wrp']}>
                            <SortingIcon
                              orderClass={cx({
                                'desc-order':
                                  getPureName(column.id) === sortBy.column &&
                                  toUpperCaseString(sortBy.order) === DESC,
                                'asc-order':
                                  getPureName(column.id) === sortBy.column &&
                                  toUpperCaseString(sortBy.order) === ASC,
                              })}
                            />
                          </span>
                        )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.length && !loader
              ? page.map((row, i) => {
                  prepareRow(row);
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <Fragment>
                      <tr
                        {...row.getRowProps()}
                        key={`body-row-${i}`}
                        className={cx(
                          {
                            'row-expended': row?.isExpanded,
                            'child-row': row?.depth > 0,
                            'parent-row': row?.depth === 0,
                          },
                          data?.length ? '' : 'empty-row',
                        )}
                      >
                        {row?.cells.map((cell, j) => {
                          return (
                            <td
                              {...cell.getCellProps()}
                              key={`row-cell-${i}${j}`}
                              className={`table-cell ${cell.column?.className || ''} ${
                                data.length === 0 ? tableStyle['empty-cell'] : ''
                              } ${
                                (!readOnly && isEditable && j === 0 && !expandedRow) ||
                                (!readOnly && expandedRow && j === 1 && isEditable)
                                  ? tableStyle.isEditable
                                  : ''
                              }`}
                              onClick={event =>
                                data.length !== 0 &&
                                handleRowDetails({ event, cell_index: j, row: cell.row.original })
                              }
                              aria-hidden="true"
                            >
                              {expandedRow || isEditable ? (
                                // eslint-disable-next-line react/jsx-no-useless-fragment
                                <>
                                  {(!readOnly && isEditable && j === 0 && !expandedRow) ||
                                  (!readOnly && expandedRow && j === 1 && isEditable) ? (
                                    <div
                                      className={cx(
                                        tableStyle['trigger-popup-cell'],
                                        'trigger-popup-for-custom',
                                        {
                                          'hide-editable': cell.row.original?.isDeleted,
                                        },
                                      )}
                                      onClick={() =>
                                        handleFormModal({
                                          status: true,
                                          rowData: row,
                                          isEdit: true,
                                          cell_index: j,
                                          depth: row.depth,
                                        })
                                      }
                                      aria-hidden="true"
                                    >
                                      <span
                                        className={cx(
                                          tableStyle['trigger-cell-text'],
                                          'trigger-cell-text-for-custom',
                                        )}
                                      >
                                        {cell.render('Cell')}
                                      </span>
                                      {/* Hide edit or view if row isDeleted true
                                        {name:john, age:30, isDeleted:true}
                                      */}
                                      {cell.row.original?.isDeleted === 'undefined' ||
                                      !cell.row.original?.isDeleted ? (
                                        <span
                                          className={cx(
                                            tableStyle['edit-details'],
                                            'edit-detail-ico-custom',
                                          )}
                                        >
                                          {isView ? (
                                            <img alt="view" title="View" src="/images/eye.svg" />
                                          ) : (
                                            <img
                                              alt="edit"
                                              title="Edit"
                                              src="/images/ico-edit.svg"
                                            />
                                          )}
                                        </span>
                                      ) : null}
                                    </div>
                                  ) : (
                                    <span>{cell.render('Cell')}</span>
                                  )}
                                </>
                              ) : (
                                <span>{cell.render('Cell')}</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                      {row?.isExpanded && expandedDiv && !row?.subRows?.length ? (
                        <tr key={`SD-${i}`}>
                          <td
                            colSpan={visibleColumns.length}
                            className={cx(tableStyle['order-child'])}
                            key={`row-cell-expended-${i}`}
                          >
                            {/*
                        Inside it, call our renderRowSubComponent function. In reality,
                        you could pass whatever you want as props to
                        a component like this, including the entire
                        table instance. But for this example, we'll just
                        pass the row
                      */}
                            {renderRowSubComponent({ row })}
                          </td>
                        </tr>
                      ) : null}
                    </Fragment>
                  );
                })
              : new Array(defaultPageSize).fill('').map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    {new Array(visibleColumnsCount - selectedColumn?.length)
                      .fill('')
                      .map((_, colIndex) => (
                        <td key={colIndex}>
                          <Skeleton />
                        </td>
                      ))}
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
      {pagination && (
        <div
          className={cx(
            'd-flex',
            'justify-content-between',
            'align-items-center',
            'pagination-wrp',
            tableStyle['data-pagination-wrp'],
          )}
        >
          {data.length && !hidePaginationOption ? (
            <>
              <div className={cx('flex-inline-center', tableStyle['row-length-wrp'])}>
                <span>View</span>
                <Dropdown
                  options={rowLengthOptions}
                  selectedValue={rowLength}
                  isClearable={false}
                  sortedOption={false}
                  isSearchable={false}
                  onChange={value => handleRowSizeChange(value)}
                  placeholder={rowLength?.value}
                  classNamePrefix="select-input-prefix"
                  className={tableStyle['tbl-size-dropdown']}
                  menuPlacement={
                    modalView && data?.length <= 5 ? 'bottom' : paginationMenuPlacement
                  }
                />
                <span>Rows</span>
              </div>
              <span
                className={tableStyle['data-entries']}
                dangerouslySetInnerHTML={{ __html: entryDetails() }}
              />

              <div className={cx('flex-inline-center', tableStyle['data-pagination'])}>
                <button
                  onClick={() => {
                    previousPage();
                    changePagination(pageIndex - 1);
                  }}
                  disabled={!canPreviousPage || loader}
                  className={cx(
                    'flex-inline-center',
                    tableStyle['paginate-box'],
                    tableStyle['prev-paginate'],
                  )}
                >
                  <img src="/images/icon-arrow.svg" alt="" />
                </button>
                <span>
                  <span className={cx('flex-inline-center', tableStyle['pagination-info'])}>
                    {pageIndex + 1} /{pageOptions.length}
                  </span>
                </span>
                <button
                  onClick={() => {
                    nextPage();
                    changePagination(pageIndex + 1);
                  }}
                  disabled={!canNextPage || loader}
                  className={cx(
                    'flex-inline-center',
                    tableStyle['paginate-box'],
                    tableStyle['next-paginate'],
                  )}
                >
                  <img src="/images/icon-arrow.svg" alt="" />
                </button>
              </div>
            </>
          ) : null}
        </div>
      )}
    </>
  );
};

export default DataTable;
