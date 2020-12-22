import { Loader } from 'google-maps';
import mapStyle from './mapStyle.json';

export class GoogleMap {
  constructor(selector) {
    this._selector = selector;
    this._loader = new Loader('AIzaSyAsqbkQgPoAcrLeAM1nzb4siCIMVMmLZH8');
  }
  init(latlng, zoom = 3) {
    if (latlng === undefined) return;
    this.currentLatLng = latlng;
    const options = {
      center: { lat: latlng.lat, lng: latlng.lng },
      zoom,
      disableDefaultUI: true,
      zoomControl: true,
      fullscreenControl: true,
      styles: mapStyle,
    };
    this._loader.load().then(google => {
      this._map = new google.maps.Map(document.getElementById('map'), options);
      this._marker = new google.maps.Marker({
        position: latlng,
        map: this._map,
      });
    });
  }
  update(latlng, zoom) {
    if (this._map === undefined) {
      this.init(latlng, zoom);
      return;
    }
    if (latlng === this.currentLatLng) {
      // this._map.panTo(this.currentLatLng);
      return;
    }
    this.currentLatLng = latlng;
    this._marker = new google.maps.Marker({
      position: latlng,
      map: this._map,
    });
    this._map.panTo(latlng);
    if (zoom !== undefined) this._map.setZoom(zoom);
  }
  get currentLatLng() {
    return this._currentLatLng;
  }
  set currentLatLng(value) {
    this._currentLatLng = value;
  }
}
