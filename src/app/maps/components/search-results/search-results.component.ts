import { Component } from '@angular/core';
import {PlacesService, MapsService } from '../../services';
import {Feature} from '../../interfaces/places';
@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {

  public selectedId: string='';

  constructor(
    private placesService: PlacesService,
    private mapsService: MapsService
    ) { }


  get isLoadingPlaces(){
    return this.placesService.isLoading;
  }
  get places(){
    return this.placesService.places;
  }
  flyTo(place:Feature){
    this.selectedId = place.id;
    const [lng, lat] = place.center;
    this.mapsService.flyTo([lng, lat]);
  }
  getDirections(place:Feature){
    if(!this.placesService.userLocation) throw Error('Location is not ready');

    this.placesService.deletePLaces();

    const start = this.placesService.userLocation;
    const end= place.center as [number, number];

    this.mapsService.getRouteBetweenPoints(start,end)

  }
}
