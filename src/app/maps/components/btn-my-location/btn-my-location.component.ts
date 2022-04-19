import { Component } from '@angular/core';
import { MapsService, PlacesService } from '../../services';
@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrls: ['./btn-my-location.component.css']
})
export class BtnMyLocationComponent {

  constructor(
    private mapsService: MapsService,
    private placesService: PlacesService
    ) { }

  goToMyLocation() {
    if(!this.placesService.isUserLocationReady) throw Error('No location set');
    if(!this.mapsService.isMapReady) throw Error('Map is not ready');

    this.mapsService.flyTo(this.placesService.useLocation!);
  }
}
