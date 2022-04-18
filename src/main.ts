import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiaGVucnl2ZW4xNCIsImEiOiJjbDI0NjU0bGgxY3l2M2tueGl5ZHBzN3k0In0.atzQFUKEbAl4mpUvEjc0tA';

if(!navigator.geolocation){
  alert('Geolocation is not supported by your browser');
  throw new Error('Geolocation is not available');
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
