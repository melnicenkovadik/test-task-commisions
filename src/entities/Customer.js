import {
  USER_CATEGORY,
  WITHDRAW
} from '../constants';

function initializeUser() {
  const weeklyRecords = [];

  function appendWeeklyRecord(weekNum, value) {
    if (weeklyRecords[weekNum]) {
      weeklyRecords[weekNum].value += value;
    } else {
      weeklyRecords[weekNum] = {
        weekNum,
        value,
      };
    }
  }

  function fetchWeeklyRecord(weekNum) {
    if (weeklyRecords[weekNum]) {
      return weeklyRecords[weekNum].value;
    }
    return 0;
  }

  function checkLimitExceeded(weekNum) {
    if (weeklyRecords[weekNum]) {
      return weeklyRecords[weekNum].value >= WITHDRAW[USER_CATEGORY.NATURAL].WEEK_LIMIT;
    }
    return false;
  }

  return {
    appendWeeklyRecord,
    fetchWeeklyRecord,
    checkLimitExceeded,
  };
}

export default initializeUser;
