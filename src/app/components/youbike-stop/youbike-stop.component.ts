import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BikeStation } from 'src/app/model';
import { YoubikeStopService } from 'src/app/service/youbike-stop.service';
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
  public infoWindow: any = [];

  public currentLat: number;
  public currentLng: number;

  public isRent: boolean = true;

  public stopResult: Array<BikeStation>;

  constructor(private router: Router,
              private youbikeStopService: YoubikeStopService) {}

  ngOnInit() {
    this.loading = true;
    this.infoWindow = new google.maps.InfoWindow();
    this.findCurrentPosition();
  }

  public navigateToIndex(): void {
    this.router.navigate(['']);
  }

  public onToggleView(): void {
    this.isRent = !this.isRent;
    this.bindGoogleMap();
  }

  public findCurrentPosition(): void {
    navigator.geolocation.watchPosition((position) => {
      this.currentLat = position.coords.latitude;
      this.currentLng = position.coords.longitude;
      this.options = {
        center: {lat: this.currentLat, lng: this.currentLng},
        zoom: 17
      };

      this.overlays = [ 
        new google.maps.Marker(
          { position: 
            { lat: this.currentLat,
              lng: this.currentLng
            },
          })
      ]
      this.findNearbyStation();
    })
  }

  public findNearbyStation(): void {
    this.youbikeStopService.getNearbyStop(this.currentLat, this.currentLng).subscribe(res => {
      this.stopResult = res;
      this.bindStationAvailablilty();
    })

  }

  public bindStationAvailablilty(): void {
    this.youbikeStopService.getNearbyAvailability(this.currentLat, this.currentLng).subscribe(res => {
      this.stopResult.forEach(stop => {
        res.forEach(availabilityStop => {
          if (stop.StationUID === availabilityStop.StationUID) {
            stop.AvailableRentBikes = availabilityStop.AvailableRentBikes;
            stop.AvailableReturnBikes = availabilityStop.AvailableReturnBikes;
          }
        })
      })
      this.bindGoogleMap();
    })
  }

  public bindGoogleMap(): void {
    // console.log('this.isRent', this.isRent)
    this.stopResult.forEach(stop => {
      let html = `<p>${stop.StationName.Zh_tw}</p>
                  <p>可借數量 <span class="number">${stop.AvailableRentBikes.toString()}</span></p>
                  <p>可停空位 <span class="number">${stop.AvailableReturnBikes.toString()}</span></p>`
      this.overlays.push(new google.maps.Marker(
        { position: {lat: stop.StationPosition.PositionLat, lng: stop.StationPosition.PositionLon}, 
          title: html,
          label: {
            text: this.isRent ? stop.AvailableRentBikes.toString() : stop.AvailableReturnBikes.toString(),
            fontWeight: "bold",
            color: this.isRent ? '#000000' : '#FED801',
          },
          icon: {
            url: this.isRent ? 'assets/rent-icon.png' : 'assets/part-icon.png',
            labelOrigin: new google.maps.Point(18, 20),
          }
        }));
    })
    this.loading = false;
  }

  public handleOverlayClick(event: any) {
    let isMarker = event.overlay.getTitle != undefined;
      if (isMarker) {
        let title = event.overlay.getTitle();
        this.infoWindow.setContent('' + title + '');
        this.infoWindow.open(event.map, event.overlay);
        event.map.setCenter(event.overlay.getPosition());
      }
  }
}
