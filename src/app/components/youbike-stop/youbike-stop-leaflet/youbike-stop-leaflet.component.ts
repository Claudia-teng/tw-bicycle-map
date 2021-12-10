import { Component, AfterViewInit, Input, SimpleChanges } from '@angular/core';
import { BikeStation } from 'src/app/model';
import * as L from 'leaflet';
import 'leaflet.markercluster';

@Component({
  selector: 'youbike-stop-leaflet',
  templateUrl: './youbike-stop-leaflet.component.html',
  styleUrls: ['./youbike-stop-leaflet.component.sass']
})
export class YoubikeStopLeafletComponent implements AfterViewInit {
  @Input() isRent: boolean = true;
  @Input() isFindNearby: boolean = false;
  @Input() userLocation: Array<any> = [];
  @Input() stopResult: Array<BikeStation>;

  private map;
  private markers;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes', changes)
    if (changes.isRent?.previousValue !== changes.isRent?.currentValue) {
      this.initLayer();
      return;
    }

    if (this.isFindNearby) {
      this.navigateToUserLocation()
    } else {
      this.navigateToCityLocation();
    }

  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private navigateToUserLocation(): void {
    if (this.userLocation?.length > 0) {
      this.map.setView([this.userLocation[0], this.userLocation[1]], 16);
      this.initLayer();
    }
  }

  private navigateToCityLocation(): void {
    if (this.stopResult.length === 0) {
      this.markers?.clearLayers();
      return;
    }

    this.map?.panTo(new L.LatLng(this.stopResult[0].StationPosition.PositionLat, this.stopResult[0].StationPosition.PositionLon));
    this.initLayer();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [ this.stopResult[0].StationPosition.PositionLat, this.stopResult[0].StationPosition.PositionLon ],
      zoom: 13
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
    this.markers?.clearLayers();
    this.markers = L.markerClusterGroup({
        // iconCreateFunction: function (cluster) {
        //   const number = cluster.getChildCount();
        //   return L.divIcon({ html: this.isRent ?
        //     `<div class="is-rent">
        //       <img src="assets/rent-icon.png"/>
        //       <span>${number}</span>
        //      </div>` :
        //     `<div class="is-park">
        //       <img src="assets/park-icon.png"/>
        //       <span>${number}</span>
        //      </div>`});
        // },
        polygonOptions: {
          fillColor: 'transparent',
          color: 'transparent',
        }
    });

    console.log('this.stopResult', this.stopResult)

    this.stopResult.forEach(stop => {
      let popupInfo = 
      `<p>${stop.StationName.Zh_tw}</p>
       <p>可借數量 <span class="number">${stop.AvailableRentBikes}</span></p>
       <p>可停空位 <span class="number">${stop.AvailableReturnBikes}</span></p>`
      
      console.log('stop', stop)
      console.log('stop.AvailableRentBikes', stop.AvailableRentBikes)
      console.log('stop.AvailableReturnBikes', stop.AvailableReturnBikes)

      let marker = new L.marker([stop.StationPosition.PositionLat, stop.StationPosition.PositionLon], {
        icon: new L.DivIcon({
          className: 'marker-icon',
          html: this.isRent ?
            `<div class="is-rent">
              <img src="assets/rent-icon.png"/>
              <span>${stop?.AvailableRentBikes}</span>
             </div>` :
            `<div class="is-park">
              <img src="assets/park-icon.png"/>
              <span>${stop?.AvailableReturnBikes}</span>
             </div>`
        })
      }).bindPopup(popupInfo);

      this.markers?.addLayer(marker);
    })
    this.map?.addLayer(this.markers);
  }

}