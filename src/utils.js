import moment from 'moment';
import createCustomer from './entities/Customer';

const format = (value, decimalPlaces = 2) => {
  if (!value) {
    return 0;
  }
  return Number(`${Math.ceil(`${value}e${decimalPlaces}`)}e-${decimalPlaces}`).toFixed(decimalPlaces);
};

const getWeek = (date) => {
  if (!date) {
    return -1;
  }
  const input = moment(date);
  return input.isoWeek();
};

const findUser = (users = [], userId = 0) => {
  if (users[userId] !== null && users[userId] !== undefined) {
    return users[userId];
  }
  const result = users;
  result[userId] = createCustomer(userId);
  return result[userId];
};

const mockData = [
  {
    date: '2016-01-05',
    user_id: 1,
    user_type: 'natural',
    type: 'cash_in',
    operation: {
      amount: 200.00,
      currency: 'EUR',
    },
  },
  {
    date: '2016-01-06',
    user_id: 2,
    user_type: 'juridical',
    type: 'cash_out',
    operation: {
      amount: 300.00,
      currency: 'EUR',
    },
  },
  {
    date: '2016-01-06',
    user_id: 1,
    user_type: 'natural',
    type: 'cash_out',
    operation: {
      amount: 30000,
      currency: 'EUR',
    },
  },
  {
    date: '2016-01-07',
    user_id: 1,
    user_type: 'natural',
    type: 'cash_out',
    operation: {
      amount: 1000.00,
      currency: 'EUR',
    },
  },
  {
    date: '2016-01-07',
    user_id: 1,
    user_type: 'natural',
    type: 'cash_out',
    operation: {
      amount: 100.00,
      currency: 'EUR',
    },
  },
  {
    date: '2016-01-10',
    user_id: 1,
    user_type: 'natural',
    type: 'cash_out',
    operation: {
      amount: 100.00,
      currency: 'EUR',
    },
  },
  {
    date: '2016-01-10',
    user_id: 2,
    user_type: 'juridical',
    type: 'cash_in',
    operation: {
      amount: 1000000.00,
      currency: 'EUR',
    },
  },
  {
    date: '2016-01-10',
    user_id: 3,
    user_type: 'natural',
    type: 'cash_out',
    operation: {
      amount: 1000.00,
      currency: 'EUR',
    },
  },
  {
    date: '2016-02-15',
    user_id: 1,
    user_type: 'natural',
    type: 'cash_out',
    operation: {
      amount: 300.00,
      currency: 'EUR',
    },
  },
];

export {
  format, getWeek, findUser, mockData,
};
