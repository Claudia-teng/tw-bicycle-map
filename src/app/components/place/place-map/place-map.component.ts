import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as L from 'leaflet';


@Component({
  selector: 'place-map',
  templateUrl: './place-map.component.html',
  styleUrls: ['./place-map.component.sass']
})
export class PlaceMapComponent {

  public loading: boolean;

  public placeName: string;
  public locationLat: number;
  public locationLon: number;

  private map;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private location: Location) {}

  ngOnInit() {
    this.route.queryParams.subscribe(
      (params: Params) => {
        this.placeName = params.placeName;
        this.locationLat = +params.locationLat;
        this.locationLon = +params.locationLon;
        this.initMap();
      });
  }
  
  private initMap(): void {
    this.map = L.map('map', {
      center: [ this.locationLat, this.locationLon ],
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
    L.marker([this.locationLat, this.locationLon]).addTo(this.map);
  }

  public navigateToPlaceDetail(): void {
    this.location.back();
  }

}
