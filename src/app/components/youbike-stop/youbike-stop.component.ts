import { Component } from '@angular/core';
import { Router } from '@angular/router';
declare var google: any

@Component({
  selector: 'youbike-stop',
  templateUrl: './youbike-stop.component.html',
  styleUrls: ['./youbike-stop.component.sass']
})

export class YoubikeStopComponent {
  public loading: boolean = true;

  public options: any;
  public overlays: any[];

  public currentLat: number;
  public currentLng: number;

  public isRent: boolean = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.loading = true;
    this.findCurrentPosition();
  }

  public navigateToIndex(): void {
    this.router.navigate(['']);
  }

  public onToggleView(): void {
    this.isRent = !this.isRent;
  }

  public findCurrentPosition(): void {
    navigator.geolocation.watchPosition((position) => {
      this.currentLat = position.coords.latitude;
      this.currentLng = position.coords.longitude;
      this.options = {
        center: {lat: this.currentLat, lng: this.currentLng},
        zoom: 12
      };

      this.overlays = [ 
        new google.maps.Marker(
          { position: 
            { lat: this.currentLat,
              lng: this.currentLng
            },
          })
      ]
      this.loading = false;
    })
  }

  public findNearbyRentStation(): void {

  }

  public findNearbyParkStation(): void {

  }


}
