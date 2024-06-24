import {
  OPERATIONS,
} from './constants';
import {
  mockData,
} from './utils';

import determineWithdrawCommission from './features/withdraw';
import calculateDepositCommission from './features/deposit';

const getCommission = (transaction, users) => {
  switch (transaction.type) {
    case OPERATIONS.CASH_IN:
      return calculateDepositCommission(transaction.operation);
    case OPERATIONS.CASH_OUT:
      return determineWithdrawCommission(transaction, users);
    default:
      return `${transaction.type} is not a valid operation`;
  }
};

const processTransactions = (data, users) => data.map((transaction) => getCommission(transaction, users));

const main = () => {
  try {
    const data = JSON.parse(JSON.stringify(mockData));
    const users = [];
    const results = processTransactions(data, users);
    results.forEach((result) => console.log(result));
  } catch (err) {
    console.error(err);
  }
};

// Execute
main();
