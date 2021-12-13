import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { RestaurantTourismInfo, ScenicSpotTourismInfo } from 'src/app/model';
import { PlaceService } from 'src/app/service';
import { nearbyPlaceCities } from './nearby-place-cities/nearby-place-cities';


@Component({
  selector: 'nearby-place-list',
  templateUrl: './nearby-place-list.component.html',
  styleUrls: ['./nearby-place-list.component.sass']
})
export class NearbyPlaceListComponent {

  public loading: boolean;
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
              private placeService: PlaceService) {}

  ngOnInit() {
    // this.selectedCity = this.cities[0];
    this.loading = true;
    navigator.geolocation.getCurrentPosition((location) => {
      this.currentLat = location.coords.latitude;
      this.currentLon = location.coords.longitude;
      this.findNearbySpots();
    })
    
  }

  public findNearbySpots(): void {
    this.placeService.getSpotsByCity(this.currentLat, this.currentLon).subscribe(res => {
      this.spotResults = res.filter(spot => spot.Picture !== null);
      this.spotResults.map(spot => {
        spot.Name.replace(/_/g, ' ');
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
    this.placeService.getRestuarantByCity(this.currentLat, this.currentLon).subscribe(res => {
      this.foodResults = res.filter(food => food.Picture !== null);
      this.foodResults.map(food => {
        food.Phone = food.Phone.slice(0, 14);
        food.Name.replace(/_/g, ' ');
      })
      setTimeout(() => this.loading = false, 800);
    }) 
  }

  public navigateToIndex():void {
    this.router.navigate(['']);
  }

  public onToggleView(): void {
    this.isSpot = !this.isSpot;
    this.loading = true;
    this.isSpot ? this.findNearbySpots() : this.checkCurrentLocationExist();
  }

  public navigateToPlaceDetail(place: ScenicSpotTourismInfo | RestaurantTourismInfo): void {
    this.router.navigate(['nearby-place-detail'], {
      queryParams: {
        placeName: place.Name,
        isSpot: this.isSpot ? 'Y' : 'N'
      }
    })
  }
}
