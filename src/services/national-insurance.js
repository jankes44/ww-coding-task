const R = require('ramda');
const moment = require('moment');
const RD = require('../utils/ramda-decimal');

const allBands = require('../config/ni');

const isDateOnOrAfter = R.curry(
  (date, dateString) => moment.utc(dateString, 'YYYY-MM-DD')
    .isSameOrBefore(date),
);

const noBandsError = (date) => new Error(`National Insurance bands unavailable for date ${date}`);

const bandsOnDate = (date) => {
  const month = moment.utc(date, 'YYYY-MM-DD');

  return R.compose(
    R.when(R.isNil, () => {
      throw noBandsError(date);
    }),
    R.prop('bands'),
    R.last,
    R.filter(R.propSatisfies(isDateOnOrAfter(month), 'startDate')),
  )(allBands);
};

// TODO this should do more than return the number it's given
const slice = R.curry((floor, ceiling, income) => { 

  console.log(income, floor, ceiling)

  const incomeInt = parseInt(income)
  const floorInt = parseInt(floor)
  const ceilingInt = parseInt(ceiling)
  let finalValue;

  if (incomeInt > ceilingInt && floorInt === 0) finalValue = RD.decimal(ceilingInt) //input > ceiling with 0 floor
  else if (incomeInt > ceilingInt && floorInt !== 0) finalValue = RD.decimal(10)
  else if (incomeInt === floorInt) finalValue = RD.decimal(0) //0 when input == floor
  else if (incomeInt < floorInt) finalValue = RD.decimal(0)
  else if (incomeInt === ceilingInt && floorInt !== 0) finalValue = RD.decimal(floorInt)
  else if (floorInt !== 0) finalValue = RD.decimal(1)
  else finalValue = RD.decimal(incomeInt)

  console.log(finalValue)
  return finalValue
  // return income
});

const calcForBand = R.curry(
  (income, { floor, ceiling, rate }) => RD.multiply(
    slice(floor, ceiling, income),
    rate,
  ),
);

module.exports = (runDate) => {
  const bands = bandsOnDate(runDate || moment.utc());
  return R.compose(
    RD.sum,
    R.flip(R.map)(bands),
    calcForBand,
  );
};

// for unit tests
module.exports.bandsOnDate = bandsOnDate;
module.exports.slice = slice;
