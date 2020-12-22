import './scss/main.scss';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { CountriesInfo } from './js/CountriesInfo';
import { WeatherWidget } from './js/WeatherWidget';
import { GoogleMap } from './js/GoogleMap';

const countries = new CountriesInfo({
  inputElement: '#search-panel__input',
  countriesView: '.countries__view',
  delay: 750,
});
const map = new GoogleMap('map');
const weather = new WeatherWidget('weather');

countries.init();
map.init(countries.currentLatLng);
setInterval(() => {
  weather.update(countries.currentCapital);
  map.update(countries.currentLatLng);
}, 750);
