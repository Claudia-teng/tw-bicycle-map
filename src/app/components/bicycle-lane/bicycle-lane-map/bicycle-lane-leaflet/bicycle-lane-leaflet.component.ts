import { Component, AfterViewInit, Input } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';

@Component({
  selector: 'bicycle-lane-leaflet',
  templateUrl: './bicycle-lane-leaflet.component.html',
  styleUrls: ['./bicycle-lane-leaflet.component.sass']
})
export class BicycleLaneLeafletComponent implements AfterViewInit {
  @Input() polyLineLocation: Array<any>;

  private map;

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [ this.polyLineLocation[0][0], this.polyLineLocation[0][1] ],
      zoom: 17
    });

    const tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoiY2xhdWRpYS10ZW5nIiwiYSI6ImNrd3lrazF1dTBtMmoyd3FydDV5Nnl1NTEifQ.ZSu5vhxmu4uy3BXWrQVInQ'
    }).addTo(this.map);

    tiles.addTo(this.map);
    this.initLayer();
  }

  public initLayer(): void {

    L.marker([this.polyLineLocation[0][0], this.polyLineLocation[0][1]], {
      icon: new L.DivIcon({
        html: `<img src="assets/lane-start-icon.png"/>`
      })
    }).addTo(this.map)

    L.marker([this.polyLineLocation[this.polyLineLocation.length-1][0], this.polyLineLocation[this.polyLineLocation.length-1][1]], {
      icon: new L.DivIcon({
        html: `<img src="assets/lane-end-icon.png"/>`
      })
    }).addTo(this.map)

    console.log('line', this.polyLineLocation)
    L.polyline(this.polyLineLocation, {
      color: '#000000',
      weight: 5,
      dashArray: '5, 10'
    }).addTo(this.map);
  }

}