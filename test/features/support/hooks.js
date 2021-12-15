const {
  Before,
  After,
  setDefaultTimeout,
} = require('cucumber');
const tk = require('timekeeper');

Before(function () {
  this.state = {};
  setDefaultTimeout(60 * 1000);
});

After(function () {
  tk.reset();
});
