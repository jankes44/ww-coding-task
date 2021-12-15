const R = require('ramda');
const {
  Given,
  When,
  Then,
} = require('cucumber');
const Decimal = require('decimal.js');
const tk = require('timekeeper');
const moment = require('moment');

const taxYearLookup = {
  '2016/17': '2016-04-06',
  '2017/18': '2017-04-06',
  '2018/19': '2018-04-06',
  '2019/20': '2019-04-06',
};

Given(/^that the current tax year is (.*)$/,
  function process(taxYear) {
    tk.freeze(moment.utc(taxYearLookup[taxYear]).toDate());
  });

Given(/^that the tax year is (.*)$/,
  function process(taxYear) {
    this.taxYear = taxYearLookup[taxYear];
  });

Given(/^that I have a monthly income of £(.*)$/,
  function process(income) {
    this.income = income;
});

When(/^calculating my ni deductions$/,
  async function process() {
    this.state.response = await
      this.supertest(this.expressInstance)
        .post('/v1/national-insurance')
        .set(this.taxYear ? { 'x-run-date': this.taxYear } : {})
        .send({
          income: this.income,
        });
});

Then(/^I should be liable to pay £(.*) in class 1 national insurance contributions$/,
  function process(expected) {
    const actual = R.path(
      ['response', 'body', 'ni'],
      this.state
    );

    this.expect(new Decimal(actual)).toEqual(new Decimal(expected));
  }
);
