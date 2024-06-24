const USER_CATEGORY = {
  LEGAL: 'juridical',
  NATURAL: 'natural',
};
const OPERATIONS = {
  CASH_IN: 'cash_in',
  CASH_OUT: 'cash_out',
};

const DEPOSIT = {
  PERCENTAGE: 0.03,
  MAX_COMMISION_AMOUNT: 5.00,
};

const PERCENT_CONVERSION = 100;

const WITHDRAW = {
  [USER_CATEGORY.NATURAL]: {
    PERCENTAGE: 0.3,
    WEEK_LIMIT: 1000,
  },
  [USER_CATEGORY.LEGAL]: {
    PERCENTAGE: 0.3,
    MIN_COMMISSION: 0.5,
  },
};
const VALUTAS = {
  EUR: {
    CODE: 'EUR',
    SMALLEST_CURRENCY_DECIMAL: 2,
  },
};

module.exports = {
  USER_CATEGORY,
  OPERATIONS,
  DEPOSIT,
  WITHDRAW,
  VALUTAS,
  PERCENT_CONVERSION,
};
