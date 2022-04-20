import { Injectable } from '@angular/core';
import { PlacesResponse, Feature } from '../interfaces/places';
import { PlacesApiClient } from '../api';
import { MapsService } from './maps.service';
@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  public userLocation?: [number, number];
  public isLoading?: boolean = false;
  public places: Feature[] = [];

  get isUserLocationReady(): boolean {
    return !!this.userLocation;
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
          this.userLocation = [
            position.coords.longitude,
            position.coords.latitude,
          ];
          resolve(this.userLocation);
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
    if (!this.userLocation) throw Error('Location is not ready');
    this.isLoading = true;
    this.placesApi
      .get<PlacesResponse>(`/${query}.json`, {
        params: {
          proximity: this.userLocation?.join(','),
        },
      })
      .subscribe((res) => {
        this.isLoading = false;
        this.places = res.features;
        this.mapsService.createMarkersFromPlaces(this.places, this.userLocation!);
      });
  }

  deletePLaces() {
    this.places = [];
  }

}
