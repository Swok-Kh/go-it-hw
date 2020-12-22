export function fetchCountries(searchQuery) {
  return fetch(
    `https://restcountries.eu/rest/v2/name/${searchQuery}`,
  ).then(response => response.json());
}
export function fetchCountryByCode(searchQuery) {
  return fetch(
    `https://restcountries.eu/rest/v2/alpha/${searchQuery}`,
  ).then(response => response.json());
}
export function fetchAllCountries() {
  return fetch('https://restcountries.eu/rest/v2/all').then(response =>
    response.json(),
  );
}
export function fetchOpenWeather(city) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ad512cbd0baf0bb56a9d7af7840a9f4f&units=metric`,
  ).then(response => response.json());
}
