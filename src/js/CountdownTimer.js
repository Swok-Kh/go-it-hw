export class CountdownTimer {
  constructor({ selector, targetDate, rememberParameters = true }) {
    this._refs = {
      timer: document.querySelector(selector),
      days: document.querySelector(`${selector} [data-value="days"]`),
      hours: document.querySelector(`${selector} [data-value="hours"]`),
      mins: document.querySelector(`${selector} [data-value="mins"]`),
      secs: document.querySelector(`${selector} [data-value="secs"]`),
      messageEl: this._createMessageEl(),
      descriptionEl: this._createTimerDescriptionEl(),
    };
    this._refs.timer.append(this._refs.messageEl);
    this._refs.timer.before(this._refs.descriptionEl);
    this._rememberParameters = rememberParameters;
    if (this._checkLocalStorage() && this._rememberParameters) {
      this._getLocalStorageTargetDate();
    } else {
      this._targetDate = targetDate;
    }

    this._remainingTime = {};
    this._countTime();
    this._setValues();
    this._runTimer();
  }
  setTargetDate(year, month, day, hour = 0, min = 0, sec = 0) {
    this._targetDate = new Date(year, month - 1, day, hour, min, sec);
    if (this._rememberParameters)
      this._setLocalStorageTargetDate(year, month, day, hour, min, sec);
    this._showMessage(
      `Target date: ${this._targetDate.toLocaleString()}`,
      'rgba(0, 66, 20, 0.8)',
    );
    this._runTimer();
  }
  _countTime() {
    const currentDate = new Date();
    const time = this._targetDate - currentDate;
    if (this._messageHandler(time)) {
      this._remainingTime.days = Math.floor(time / (1000 * 60 * 60 * 24));
      this._remainingTime.hours = Math.floor(
        (time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      this._remainingTime.mins = Math.floor(
        (time % (1000 * 60 * 60)) / (1000 * 60),
      );
      this._remainingTime.secs = Math.floor((time % (1000 * 60)) / 1000);
    }
  }
  _messageHandler(time) {
    if (time < 1000 && time > 0) {
      this._clearTimer();
      this._showMessage('The countdown is over', 'rgba(0, 66, 20, 0.8)');
      return false;
    } else if (time < 0) {
      this._clearTimer();
      this._showMessage(
        'Error. The date smaller that now.',
        'rgba(255, 0, 0, 0.8)',
      );
      return false;
    } else {
      this._hideMessage();
      return true;
    }
  }
  _setValues() {
    this._numberAnimation(
      this._setValue(this._remainingTime.days),
      this._refs.days,
    );
    this._numberAnimation(
      this._setValue(this._remainingTime.hours),
      this._refs.hours,
    );
    this._numberAnimation(
      this._setValue(this._remainingTime.mins),
      this._refs.mins,
    );
    this._numberAnimation(
      this._setValue(this._remainingTime.secs),
      this._refs.secs,
    );
  }
  _setValue(value) {
    return value.toString().length === 1 ? '0' + value : value;
  }
  _numberAnimation(value, ref) {
    if (Number.parseInt(value) === Number.parseInt(ref.textContent)) {
      return;
    }
    ref.style.transform = 'rotate3d(1, 0, 0, -90deg) scale3d(1.2, 1.2, 1.2)';
    setTimeout(() => {
      ref.style.transform = 'rotate3d(0, 0, 0, -90deg) scale3d(1, 1, 1)';
      ref.textContent = value;
    }, 500);
  }
  _clearTimer() {
    clearInterval(this._timerId);
    this._refs.days.textContent = this._refs.hours.textContent = this._refs.mins.textContent = this._refs.secs.textContent = 0;
    this._remainingTime.days = this._remainingTime.hours = this._remainingTime.mins = this._remainingTime.secs = 0;
  }
  _runTimer() {
    clearInterval(this._timerId);
    this._timerId = setInterval(() => {
      this._countTime();
      this._setValues();
      this._setTimerDescriptionValue();
    }, 1000);
  }
  _checkLocalStorage() {
    if (
      localStorage.getItem('timerTargetYear') ||
      localStorage.getItem('timerTargetMonth') ||
      localStorage.getItem('timerTargetDay')
    ) {
      return true;
    }
  }
  _setLocalStorageTargetDate(year, month, day, hour = 0, min = 0, sec = 0) {
    localStorage.setItem('timerTargetYear', year);
    localStorage.setItem('timerTargetMonth', month);
    localStorage.setItem('timerTargetDay', day);
    localStorage.setItem('timerTargetHour', hour);
    localStorage.setItem('timerTargetMin', min);
    localStorage.setItem('timerTargetSec', sec);
  }
  _getLocalStorageTargetDate() {
    this.setTargetDate(
      localStorage.getItem('timerTargetYear'),
      localStorage.getItem('timerTargetMonth'),
      localStorage.getItem('timerTargetDay'),
      localStorage.getItem('timerTargetHour'),
      localStorage.getItem('timerTargetMin'),
      localStorage.getItem('timerTargetSec'),
    );
  }
  _createMessageEl() {
    const messageEl = document.createElement('div');
    messageEl.style.position = 'absolute';
    messageEl.style.top = '10px';
    messageEl.style.padding = '20px';
    messageEl.style.borderRadius = '5px';
    messageEl.style.opacity = '0';
    messageEl.style.pointerEvents = 'none';
    messageEl.style.transition =
      'opacity 250ms ease-out, background-color 250ms ease-out';

    return messageEl;
  }
  _showMessage(text, color) {
    this._refs.messageEl.style.backgroundColor = color;
    this._refs.messageEl.textContent = text;
    this._refs.messageEl.style.opacity = '1';
  }
  _hideMessage() {
    this._refs.messageEl.style.opacity = '0';
  }
  _createTimerDescriptionEl() {
    const description = document.createElement('div');
    description.style.margin = '0';
    description.style.marginTop = '20px';
    description.style.textAlign = 'center';
    description.style.fontStyle = 'italic';
    description.textContent = `Target date: `;

    return description;
  }
  _setTimerDescriptionValue() {
    this._refs.descriptionEl.textContent = `Target date: ${this._targetDate.toLocaleString()}`;
  }
}
