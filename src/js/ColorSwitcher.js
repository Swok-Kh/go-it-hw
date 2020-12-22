export default class {
  constructor({ startButton, stopButton, colors, delay = 1000 }) {
    this._refs = {
      startButton: document.querySelector(startButton),
      stopButton: document.querySelector(stopButton),
      body: document.querySelector('body'),
    };
    this._colors = colors;
    this._delay = delay;
    this._stopButtonDisable();

    this._refs.startButton.addEventListener(
      'click',
      this._startButtonHandler.bind(this),
    );
    this._refs.stopButton.addEventListener(
      'click',
      this._stopButtonHandler.bind(this),
    );
  }
  _setBodyBackgroundColor() {
    this._checkRandomColor(
      this._randomIntegerFromInterval,
      0,
      this._colors.length - 1,
    );
    this._refs.body.style.backgroundColor = this._color;
  }
  _checkRandomColor(cb, min, max) {
    const color = this._colors[cb(min, max)];
    if (color === this._color) {
      this._checkRandomColor(cb, min, max);
    } else {
      this._color = color;
    }
  }
  _randomIntegerFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  _startButtonHandler() {
    if (!this._refs.startButton.disabled) {
      this._timerId = setInterval(() => {
        this._setBodyBackgroundColor();
      }, this._delay);
      this._startButtonDisable();
    }
  }
  _stopButtonHandler() {
    clearInterval(this._timerId);
    this._stopButtonDisable();
  }
  _startButtonDisable() {
    this._refs.startButton.disabled = true;
    this._refs.stopButton.disabled = false;
  }
  _stopButtonDisable() {
    this._refs.startButton.disabled = false;
    this._refs.stopButton.disabled = true;
  }
}
