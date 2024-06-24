import {
  VALUTAS,
  DEPOSIT,
  WITHDRAW,
  USER_CATEGORY, PERCENT_CONVERSION,
} from '../../constants';
import {
  findUser,
  format,
  getWeek,
} from '../../utils';

const calculateLegalWithdrawCommission = (transact) => {
  const {
    amount: qty,
    currency: curr,
  } = transact;
  if (curr === VALUTAS.EUR.CODE) {
    const commission = qty * (WITHDRAW[USER_CATEGORY.LEGAL].PERCENTAGE / PERCENT_CONVERSION);
    return commission < WITHDRAW[USER_CATEGORY.LEGAL].MIN_COMMISSION
      ? WITHDRAW[USER_CATEGORY.LEGAL].MIN_COMMISSION.toFixed(VALUTAS.EUR.SMALLEST_CURRENCY_DECIMAL)
      : format(commission, VALUTAS.EUR.SMALLEST_CURRENCY_DECIMAL);
  }
  return `${curr} currency is currently not supported`;
};

const updateWeeklyRecord = (user, week, amount) => {
  const newRecord = {
    ...user.weeklyRecord,
    [week]: (user.weeklyRecord && user.weeklyRecord[week] ? user.weeklyRecord[week] : 0) + amount,
  };
  return { ...user, weeklyRecord: newRecord };
};


const calculateNaturalWithdrawCommission = (inputData, allUsers) => {
  const {
    operation: transact,
    user_id: uid,
    date: operationDate,
  } = inputData;
  const currentUser = findUser(allUsers, uid);
  const currentWeek = getWeek(operationDate);
  const updatedUser = {
    ...currentUser,
  };

  if (transact.currency === VALUTAS.EUR.CODE) {
    if (currentUser.checkLimitExceeded(currentWeek)) {
      const commission = transact.amount
        * (WITHDRAW[USER_CATEGORY.NATURAL].PERCENTAGE / PERCENT_CONVERSION);
      return format(commission, VALUTAS.EUR.SMALLEST_CURRENCY_DECIMAL);
    }

    const taxableAmt = transact.amount
      - (WITHDRAW[USER_CATEGORY.NATURAL].WEEK_LIMIT - currentUser.fetchWeeklyRecord(currentWeek));

    if (taxableAmt > 0) {
      updatedUser.weeklyRecord = updateWeeklyRecord(currentUser, currentWeek, transact.amount - taxableAmt).weeklyRecord;
      const commission = taxableAmt * (WITHDRAW[USER_CATEGORY.NATURAL].PERCENTAGE / PERCENT_CONVERSION);
      return format(commission, VALUTAS.EUR.SMALLEST_CURRENCY_DECIMAL);
    }

    updatedUser.weeklyRecord = updateWeeklyRecord(currentUser, currentWeek, transact.amount).weeklyRecord;
    const commission = 0;
    return commission.toFixed(VALUTAS.EUR.SMALLEST_CURRENCY_DECIMAL);
  }
  return `${transact.currency} currency is currently not supported`;
};

const determineWithdrawCommission = (inputData, allUsers = []) => {
  if (!inputData) {
    return 'No user provided';
  }
  const {
    user_type: clientType,
    operation: transact,
  } = inputData;
  switch (clientType) {
    case USER_CATEGORY.LEGAL:
      return calculateLegalWithdrawCommission(transact);
    case USER_CATEGORY.NATURAL:
      return calculateNaturalWithdrawCommission(inputData, allUsers);
    default:
      return `${clientType} is not a valid user`;
  }
};

export default determineWithdrawCommission;
