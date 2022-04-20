import { Injectable } from '@angular/core';
import { PlacesResponse, Feature } from '../interfaces/places';
import { PlacesApiClient } from '../api';
import { MapsService } from './maps.service';
@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  public useLocation?: [number, number];
  public isLoading?: boolean = false;
  public places: Feature[] = [];

  get isUserLocationReady(): boolean {
    return !!this.useLocation;
  }

  constructor(
    private placesApi: PlacesApiClient,
    private mapsService: MapsService
  ) {
    this.getUserLocation();
  }

  public async getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.useLocation = [
            position.coords.longitude,
            position.coords.latitude,
          ];
          resolve(this.useLocation);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  getPlacesByQuery(query: string = '') {
    if (query.length === 0) {
      this.isLoading = false;
      this.places = [];
      return;
    }
    if (!this.useLocation) throw Error('Location is not ready');
    this.isLoading = true;
    this.placesApi
      .get<PlacesResponse>(`/${query}.json`, {
        params: {
          proximity: this.useLocation?.join(','),
        },
      })
      .subscribe((res) => {
        this.isLoading = false;
        this.places = res.features;
        this.mapsService.createMarkersFromPlaces(this.places, this.useLocation!);
      });
  }
}
