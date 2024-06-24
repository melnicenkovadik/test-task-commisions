import {
  VALUTAS,
  DEPOSIT, PERCENT_CONVERSION,
} from '../../constants';
import {
  format,
} from '../../utils';

const calculateDepositCommission = (transact) => {
  const {
    amount: qty,
    currency: curr,
  } = transact;
  if (curr === VALUTAS.EUR.CODE) {
    const commission = qty * (DEPOSIT.PERCENTAGE / PERCENT_CONVERSION);
    return commission > DEPOSIT.MAX_COMMISION_AMOUNT
      ? DEPOSIT.MAX_COMMISION_AMOUNT.toFixed(VALUTAS.EUR.SMALLEST_CURRENCY_DECIMAL)
      : format(commission, VALUTAS.EUR.SMALLEST_CURRENCY_DECIMAL);
  }
  return `${curr} is currently not supported`;
};

export default calculateDepositCommission;
