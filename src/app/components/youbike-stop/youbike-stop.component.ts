import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { BikeStation } from 'src/app/model';
import { YoubikeStopService } from 'src/app/service';
import { cityList } from '../shared/city-list/city-list';

@Component({
  selector: 'youbike-stop',
  templateUrl: './youbike-stop.component.html',
  styleUrls: ['./youbike-stop.component.sass']
})

export class YoubikeStopComponent {
  public loading: boolean = true;

  public cities: Array<SelectItem> = cityList;
  public selectedCity: SelectItem;
  public inputSearch: string;

  public currentLat: number;
  public currentLng: number;

  public isRent: boolean = true;
  public isFindNearby: boolean;
  public userLocation: Array<any>;

  public stopResult: Array<BikeStation>;
  public stopMapResult: Array<BikeStation>;

  constructor(private router: Router,
              private youbikeStopService: YoubikeStopService) {}

  ngOnInit() {
    this.loading = true;
    this.selectedCity = this.cities[0];
    this.onSearchStopByCity();
  }

  public navigateToIndex(): void {
    this.router.navigate(['']);
  }

  public onSearchStopByCity() : void {
    this.isFindNearby = false;
    this.youbikeStopService.getStationByCity(this.selectedCity.value, this.inputSearch).subscribe(res => {
      this.stopResult = res;
      this.bindCityStopAvailability();
    })
  }

  public bindCityStopAvailability(): void {
    this.youbikeStopService.getAvailabilityByCity(this.selectedCity.value).subscribe(res => {
      this.stopResult.map(stop => {
        res.forEach(availabilityStop => {
          if (stop.StationUID === availabilityStop.StationUID) {
            stop.AvailableRentBikes = availabilityStop.AvailableRentBikes;
            stop.AvailableReturnBikes = availabilityStop.AvailableReturnBikes;
          }
        })
      })
      this.stopMapResult = this.stopResult;
      this.loading = false;
    })
  }

  public onToggleView(): void {
    this.isRent = !this.isRent;
    this.isFindNearby = false;
  }

  public findCurrentPosition(): void {
    this.isFindNearby = true;
    navigator.geolocation.getCurrentPosition((position) => {
      this.userLocation = [position.coords.latitude, position.coords.longitude];
      this.currentLat = position.coords.latitude;
      this.currentLng = position.coords.longitude;
      this.findNearbyStation();
    })
  }

  public findNearbyStation(): void {
    this.youbikeStopService.getNearbyStop(this.currentLat, this.currentLng).subscribe(res => {
      this.stopResult = res;
      this.bindNaerbyStationAvailablilty();
    })

  }

  public bindNaerbyStationAvailablilty(): void {
    this.youbikeStopService.getNearbyAvailability(this.currentLat, this.currentLng).subscribe(res => {
      this.stopResult.map(stop => {
        res.forEach(availabilityStop => {
          if (stop.StationUID === availabilityStop.StationUID) {
            stop.AvailableRentBikes = availabilityStop.AvailableRentBikes;
            stop.AvailableReturnBikes = availabilityStop.AvailableReturnBikes;
          }
        })
      });
      this.stopMapResult = this.stopResult;
      this.loading = false;
    })
  }
}
