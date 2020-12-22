import { fetchOpenWeather } from './fetchApi';
import { notifyHandler } from './Notify';

export class WeatherWidget {
  constructor(selector) {
    this._refs = {
      city: document.querySelector(`.${selector}__city`),
      tempF: document.querySelector(`.${selector}__temp-fahrenheit`),
      tempC: document.querySelector(`.${selector}__temp-celsius`),
      humidity: document.querySelector(`.${selector}__humidity`),
      pressure: document.querySelector(`.${selector}__pressure`),
      wind: document.querySelector(`.${selector}__wind`),
      windDeg: document.querySelector(`.${selector}__wind-deg`),
      img: document.querySelector(`.${selector}__image`),
    };
  }
  update(city) {
    if (city === undefined) return;
    if (city === this._currentCity) return;
    fetchOpenWeather(city)
      .then(data => {
        this._updateValues(data);
        this._currentCity = city;
      })
      .catch(e => console.log(e));
  }
  _updateValues(data) {
    if (data.cod === '400' || data.cod === '404') {
      notifyHandler(`Weather - ${data.message}`, 'error', data.cod);
      this._updateValue(this._refs.city, '---');
      this._updateValue(this._refs.tempF, '---');
      this._updateValue(this._refs.tempC, '---');
      this._updateValue(this._refs.humidity, '---');
      this._updateValue(this._refs.pressure, '---');
      this._updateValue(this._refs.wind, '---');
      this._refs.img.src = `https://openweathermap.org/img/wn/03d@2x.png`;
      this._refs.img.alt = 'scattered clouds';
      return;
    }
    this._updateValue(this._refs.city, data.name);
    this._updateValue(
      this._refs.tempF,
      Math.round(((data.main.temp * 9) / 5 + 32) * 10) / 10,
    );
    this._updateValue(this._refs.tempC, Math.round(data.main.temp * 10) / 10);
    this._updateValue(this._refs.humidity, data.main.humidity);
    this._updateValue(this._refs.pressure, data.main.pressure);
    this._updateValue(this._refs.wind, data.wind.speed);
    this._refs.windDeg.style.transform = `rotate(${data.wind.deg}deg)`;
    this._updateImage(
      this._refs.img,
      `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    );
    this._refs.img.alt = data.weather[0].description;
  }
  _updateValue(target, value) {
    if (target.textContent === `${value}`) return;
    target.style.opacity = '0';
    setTimeout(() => {
      target.textContent = value;
      target.style.opacity = '1';
    }, 200);
  }
  _updateImage(target, value) {
    if (target.src === value) return;
    target.style.transform = 'scale(0)';
    setTimeout(() => {
      target.src = value;
    }, 200);
    setTimeout(() => {
      target.style.transform = 'scale(1.5)';
    }, 300);
  }
}
