import {
  fetchAllCountries,
  fetchCountries,
  fetchCountryByCode,
} from './fetchApi';
import { notifyHandler } from './Notify';
import countryTemplate from '../templates/country.hbs';
import countriesListTemplate from '../templates/countriesList.hbs';

import { debounce } from 'lodash';

export class CountriesInfo {
  constructor({ inputElement, countriesView, delay = 500 }) {
    this._refs = {
      input: document.querySelector(inputElement),
      view: document.querySelector(countriesView),
    };
    this._delay = delay;
  }
  init() {
    fetchAllCountries().then(this._showRandomCountry.bind(this));
    this._refs.input.focus();
    // Context binding
    this._requestHandler = this._requestHandler.bind(this);
    this._receivedDataHandler = this._receivedDataHandler.bind(this);
    this._viewClickHandler = this._viewClickHandler.bind(this);

    this._debouncedRequestHandler = debounce(this._requestHandler, this._delay);
    this._refs.input.addEventListener('input', this._debouncedRequestHandler);
    this._refs.input.addEventListener('focus', this._debouncedRequestHandler);
    this._refs.view.addEventListener('click', this._viewClickHandler);
  }
  _requestHandler(e) {
    if (e.target.value === '') {
      return;
    }
    fetchCountries(e.target.value)
      .then(this._receivedDataHandler)
      .catch(err => console.log(err));
  }
  _receivedDataHandler(data) {
    if (data.status === 404) {
      notifyHandler(`${data.message}`, 'error', data.status);
      return;
    }
    if (data.hasOwnProperty('name')) {
      this._showOneCountry(data);
      return;
    }
    if (data.length > 10) {
      notifyHandler(
        `Too many countries found: ${data.length}`,
        'error',
        'ERROR',
      );
      return;
    }
    if (data.length === 1) {
      this._showOneCountry(data[0]);
      return;
    }
    this._showListOfCountries(data);
  }

  _showListOfCountries(countries) {
    this._render(countriesListTemplate(countries));
  }
  _showOneCountry(country) {
    this._render(countryTemplate(country));
    this._writeCurrent(country);
  }
  _showRandomCountry(countries) {
    notifyHandler('Showed random country', 'notice', ';-)');
    const country = countries[Math.round(Math.random() * countries.length - 1)];
    this._render(countryTemplate(country), 500);
    this._writeCurrent(country);
  }
  _writeCurrent(country) {
    this.currentCapital =
      country.capital === '' ? country.name : country.capital;
    this.currentLatLng = { lat: country.latlng[0], lng: country.latlng[1] };
  }
  _render(htmlString, delay = 250) {
    this._viewHide();
    setTimeout(() => {
      this._refs.view.innerHTML = htmlString;
      this._viewShow();
    }, delay);
  }
  _viewClickHandler(e) {
    if (e.target.dataset.alfa3code) {
      fetchCountryByCode(e.target.dataset.alfa3code).then(
        this._receivedDataHandler,
      );
    }
  }
  _viewShow() {
    this._refs.view.classList.add('countries__view--show');
  }
  _viewHide() {
    this._refs.view.classList.remove('countries__view--show');
  }
  get currentCapital() {
    return this._currentCapital;
  }
  set currentCapital(value) {
    this._currentCapital = value;
  }
  get currentLatLng() {
    return this._currentLatLng;
  }
  set currentLatLng(value) {
    this._currentLatLng = { lat: value.lat, lng: value.lng };
  }
}
