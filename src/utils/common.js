/* eslint-disable no-nested-ternary */
import CONSTANTS from './constant';

// Handle strip tags from input text
// <div><p>Hey that's <span>something</span></p></div> to Hey that's something
export const stripTags = text => {
  return ((text !== '' && typeof text === 'string') || text instanceof String) &&
    text.match(/(<([^>]+)>)/gi)
    ? text.replace(/(<([^>]+)>)/gi, '')
    : text;
};

export const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  const h = `0${date.getHours()}`.slice(-2);
  const m = `0${date.getMinutes()}`.slice(-2);
  return year + month + day + h + m;
};

// This function will help to convert line breaks in text with <br> tag
// or replace <br> tags from text with line breaks in text
export const textFormate = (text, type) => {
  if (!text) return text;
  switch (type) {
    case CONSTANTS.textToHtml:
      return text.replace(/(\r\n|\r|\n){2,}/g, '$1\n').replaceAll(/\n/g, '<br />');
    case CONSTANTS.htmlToText:
      return text.replaceAll(/<br\s*[\/]?>/gi, '\n');
    default:
      return text;
  }
};

export const isNumber = value => {
  const reg = new RegExp(/^[0-9]+$/);
  return reg.test(value);
};

export const isNumberWithDot = value => {
  const reg = new RegExp(/^[0-9]*\.?[0-9]{0,2}$/);
  return reg.test(value);
};

export const isAlphaNumeric = value => {
  const reg = new RegExp(/^[a-zA-Z0-9]+$/);
  return reg.test(value);
};

export const isAlphaNumericWithSpace = value => {
  const reg = new RegExp(/^[a-zA-Z0-9\s]+$/);
  return reg.test(value);
};

export const isAlphaNumericWithDash = value => {
  const reg = new RegExp(/^[a-zA-Z0-9-\s]+$/);
  return reg.test(value);
};

export const isAlphabet = value => {
  const reg = new RegExp(/^[a-zA-Z]+/);
  return reg.test(value);
};

// This function will help to validate value number and float number
// allow only two digit after decimal point
export const isFloatNumber = value => {
  const reg = new RegExp(/^\d+(\.\d{0,2})?$/);
  return reg.test(value);
};

// This function will help to validate value like (1.)
// if the user enter a value like 1. then it will return false
export const checkValidFloatNumber = value => {
  const reg = new RegExp(/^\d+(\.\d{1,2})?$/);
  return reg.test(value);
};

// "aaa @& {}* bbb." TO "aaabbb"
export const filterAlphaNumeric = str => {
  if (!str || typeof str !== 'string') return str;
  return str.replace(/[^0-9a-zA-Z]/g, '');
};

export const filterAlphaNumericWithSpace = str => {
  return str.toString().replace(/[^a-zA-Z0-9 ]/g, '');
};

export const downloadFile = (link, fileDisplayName = '') => {
  try {
    if (link) {
      fetch(link)
        .then(response => response.blob())
        .then(async blob => {
          const objectURL = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = objectURL;
          a.download = fileDisplayName || link.split('/').pop();
          a.click();
          a.remove();
        });
    }
  } catch (error) {
    /* console.warn(error); */
  }
};

// sorting data on behalf of key, value and order (value should be String)
export const sortByStringValue = (data, shortKey, order) => {
  return data.length
    ? data.sort((record1, record2) => {
        const value1 =
          typeof record1[shortKey] === 'string'
            ? record1[shortKey]?.toUpperCase().replace(/[^a-zA-Z]/g, '')
            : record1[shortKey];
        const value2 =
          typeof record2[shortKey] === 'string'
            ? record2[shortKey]?.toUpperCase().replace(/[^a-zA-Z]/g, '')
            : record2[shortKey];
        if (order === 'ASC') {
          if (value1 > value2) return 1;
          if (value2 > value1) return -1;
        } else {
          if (value1 > value2) return -1;
          if (value2 > value1) return 1;
        }
        return 0;
      })
    : [];
};

// sorting data on behalf of key, value and order (value should be number)
export const sortByNumberValue = (data, shortKey, order) => {
  return data.length
    ? data.sort((record1, record2) => {
        if (order === 'DESC') return parseFloat(record2[shortKey]) - parseFloat(record1[shortKey]);
        return parseFloat(record1[shortKey]) - parseFloat(record2[shortKey]);
      })
    : [];
};

// sorting alpha numeric
export const sortByAlphaNumericValue = (data, shortKey, order) => {
  return data.length
    ? data.sort((record1, record2) => {
        if (order === 'DESC')
          return record2[shortKey].localeCompare(
            record1[shortKey]?.toString().replace(/[^a-zA-Z0-9 ]/g, ''),
          );
        return record1[shortKey].localeCompare(
          record2[shortKey]?.toString().replace(/[^a-zA-Z0-9 ]/g, ''),
        );
      })
    : [];
};

// sorting data on date
export const sortByDate = (data, dateKey, order) => {
  return Array.isArray(data) && data.length
    ? data.sort((record1, record2) =>
        order === 'DESC'
          ? new Date(record2[dateKey]) - new Date(record1[dateKey])
          : new Date(record1[dateKey]) - new Date(record2[dateKey]),
      )
    : [];
};

export const isValidUrl = value => {
  const reg = new RegExp(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&=]*)/,
  );
  return reg.test(value);
};

// Single and multiple email (comma separated) validation
export const validateEmail = data => {
  const reg =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (data) {
    const emailArr = data.split(',');
    for (let i = 0; i < emailArr.length; ++i) {
      if (!reg.test(emailArr[i].trim())) {
        return false;
      }
    }
  }
  return true;
};

export const getOnlyAlphabets = str => {
  if (str && typeof str === 'string') {
    return str.replace(/[0-9]/g, '');
  }
  return str;
};

export const nFormatter = (num, prefix = '') => {
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'B' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ];
  const item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return Math.abs(num) >= item.value;
    });
  return item
    ? `${prefix} ${(num / item.value)?.toFixed(2)}`
        .replace(rx, '')
        .replace(`${prefix}-`, `-${prefix}`) + item.symbol
    : `${prefix} 0`;
};

// hello to Hello
export const ucFirst = s => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const toFixedVal = ({ val = 0, defaultVal = 0, fixedLength = 2 }) => {
  const value = Number(val);
  if (typeof value === 'number' && !Number.isNaN(value)) {
    if (Number.isInteger(value)) return value;
    return value?.toFixed(fixedLength);
  }
  return defaultVal;
};
