import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { PlacesService, MapsService } from '../../services';
import { Map, Popup, Marker } from 'mapbox-gl';
@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css'],
})
export class MapViewComponent implements AfterViewInit {
  @ViewChild('mapDiv') mapElement!: ElementRef;

  constructor(
    private placesService: PlacesService,
    private mapService: MapsService
  ) {}

  ngAfterViewInit(): void {
    if (!this.placesService.useLocation) throw Error('No location set');
    const map = new Map({
      container: this.mapElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.placesService.useLocation,
      zoom: 14,
    });

    const popup = new Popup().setHTML(
      `<h6>
        Here you are!
       </h6>
        <span>This is the map</span>
      `
    );
    new Marker({ color: 'red' })
      .setLngLat(this.placesService.useLocation)
      .setPopup(popup)
      .addTo(map);

    this.mapService.setMapReady(map);
  }
}
