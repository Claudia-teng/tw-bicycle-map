import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { RestaurantTourismInfo, ScenicSpotTourismInfo } from 'src/app/model';
import { PlaceService } from 'src/app/service';
import { placeCityList } from './place-city-list/place-city-list';


@Component({
  selector: 'place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.sass']
})
export class PlaceListComponent {

  public loading: boolean;
  public isSpot: boolean = true;
  public cities: Array<SelectItem> = placeCityList;
  public selectedCity: SelectItem;
  public spotResults: Array<ScenicSpotTourismInfo>;
  public foodResults: Array<RestaurantTourismInfo>;

  constructor(private router: Router,
              private placeService: PlaceService) {}

  ngOnInit() {
    this.selectedCity = this.cities[0];
    this.loading = true;
    this.findSpotsByCity();
  }

  public findSpotsByCity(): void {
    this.placeService.getSpotsByCity(this.selectedCity.value).subscribe(res => {
      this.spotResults = res.filter(spot => spot.Picture !== null);
      setTimeout(() => this.loading = false, 800);
    })
  }

  public findRestuarantByCity(): void {
    this.placeService.getRestuarantByCity(this.selectedCity.value).subscribe(res => {
      this.foodResults = res.filter(food => food.Picture !== null);
      setTimeout(() => this.loading = false, 800);
    })
  }

  public navigateToIndex():void {
    this.router.navigate(['']);
  }

  public onToggleView(): void {
    this.isSpot = !this.isSpot;
    this.loading = true;
    this.isSpot ? this.findSpotsByCity() : this.findRestuarantByCity();
  }

  public onCityChange(): void {
    this.loading = true;
    this.isSpot ? this.findSpotsByCity() : this.findRestuarantByCity();
  }

  public navigateToPlaceDetail(place: ScenicSpotTourismInfo | RestaurantTourismInfo): void {
    this.router.navigate(['place-detail'], {
      queryParams: {
        placeName: place.Name,
        city: this.selectedCity.value,
        isSpot: this.isSpot
      }
    })
  }

}
