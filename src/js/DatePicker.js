export class DatePicker {
  constructor({
    yearSelector,
    monthSelector,
    daySelector,
    hourSelector,
    minSelector,
    secSelector,
    buttonSelector,
    startYear = 2021,
    startMonth = 1,
    startDay = 1,
    startHour = 0,
    startMin = 0,
    startSec = 0,
  }) {
    this._dateRefs = {
      year: document.querySelector(yearSelector),
      month: document.querySelector(monthSelector),
      day: document.querySelector(daySelector),
      hour: document.querySelector(hourSelector),
      min: document.querySelector(minSelector),
      sec: document.querySelector(secSelector),
      button: document.querySelector(buttonSelector),
    };
    this._setDateValues(
      startYear,
      startMonth,
      startDay,
      startHour,
      startMin,
      startSec,
    );
  }
  _setDateValues(year, month, day, hour, min, sec) {
    this._dateRefs.year.value = year;
    this._dateRefs.month.value = month;
    this._dateRefs.day.value = day;
    this._dateRefs.hour.value = hour;
    this._dateRefs.min.value = min;
    this._dateRefs.sec.value = sec;
  }
  _buttonHandler(cb) {
    cb(
      Number.parseInt(this._dateRefs.year.value),
      Number.parseInt(this._dateRefs.month.value),
      Number.parseInt(this._dateRefs.day.value),
      Number.parseInt(this._dateRefs.hour.value),
      Number.parseInt(this._dateRefs.min.value),
      Number.parseInt(this._dateRefs.sec.value),
    );
  }
}
