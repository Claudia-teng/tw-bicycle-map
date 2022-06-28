import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { RestaurantTourismInfo, ScenicSpotTourismInfo } from 'src/app/model';
import { NearbyPlaceService } from 'src/app/service';
import { nearbyPlaceCities } from './nearby-place-cities/nearby-place-cities';


@Component({
  selector: 'nearby-place-list',
  templateUrl: './nearby-place-list.component.html',
  styleUrls: ['./nearby-place-list.component.sass']
})
export class NearbyPlaceListComponent {

  public loading: boolean;
  public showError: boolean;
  public isSpot: boolean = true;
  public cities: Array<SelectItem> = nearbyPlaceCities;
  public selectedCity: SelectItem;
  public originSpotResults: Array<ScenicSpotTourismInfo>;
  public originFoodResults: Array<RestaurantTourismInfo>;
  public spotResults: Array<ScenicSpotTourismInfo>;
  public foodResults: Array<RestaurantTourismInfo>;

  public currentLat: number;
  public currentLon: number;

  constructor(private router: Router,
              private nearbyPlaceService: NearbyPlaceService) {}

  ngOnInit() {
    this.loading = true;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((location) => {
        this.currentLat = location.coords.latitude;
        this.currentLon = location.coords.longitude;
        this.findNearbySpots();
      }, (err) => {
        this.loading = false;
        this.showError = true;
      })
    }
  }

  public findNearbySpots(): void {
    this.nearbyPlaceService.getSpotsByCity(this.currentLat, this.currentLon).subscribe(res => {
      this.spotResults = res.filter(spot => spot.Picture !== null);
      this.spotResults.map(spot => {
        spot.Phone = spot.Phone.slice(0, 14)
      })
      setTimeout(() => this.loading = false, 800);
    })
  }

  public checkCurrentLocationExist(): void {
    if (!this.currentLat || !this.currentLon) {
      navigator.geolocation.getCurrentPosition((location) => {
        this.currentLat = location.coords.latitude;
        this.currentLon = location.coords.longitude;
        this.findNearbyRestuarant();
      });
    } else {
      this.findNearbyRestuarant();
    }
  }

  public findNearbyRestuarant(): void {
    this.nearbyPlaceService.getRestuarantByCity(this.currentLat, this.currentLon).subscribe(res => {
      this.foodResults = res.filter(food => food.Picture !== null);
      this.foodResults.map(food => {
        food.Phone = food.Phone.slice(0, 14);
      })
      setTimeout(() => this.loading = false, 800);
    }) 
  }

  public navigateToIndex():void {
    this.router.navigate(['']);
  }

  public onToggleView(): void {
    this.isSpot = !this.isSpot;
    if (this.showError) return;
    this.loading = true;
    this.isSpot ? this.findNearbySpots() : this.checkCurrentLocationExist();
  }

  public navigateToPlaceDetail(place: any): void {
    this.router.navigate(['nearby-place-detail'], {
      queryParams: {
        placeName: this.isSpot ? place.ScenicSpotName : place.RestaurantName,
        isSpot: this.isSpot ? 'Y' : 'N'
      }
    })
  }
}
