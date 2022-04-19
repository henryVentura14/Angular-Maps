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
    private placeService: PlacesService,
    private mapsService: MapsService
    ) { }


  get isLoadingPlaces(){
    return this.placeService.isLoading;
  }
  get places(){
    return this.placeService.places;
  }
  flyTo(place:Feature){
    this.selectedId = place.id;
    const [lng, lat] = place.center;
    this.mapsService.flyTo([lng, lat]);
  }
}
