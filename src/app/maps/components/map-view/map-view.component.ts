import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { PlacesService } from '../../services';
import { Map } from 'mapbox-gl';
@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css'],
})
export class MapViewComponent implements AfterViewInit {
  @ViewChild('mapDiv') mapElement!: ElementRef;

  constructor(private placesService: PlacesService) {}

  ngAfterViewInit(): void {
    if(!this.placesService.useLocation) throw Error('No location set');
    const map = new Map({
      container: this.mapElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.placesService.useLocation,
      zoom: 14,
    });
  }
}
