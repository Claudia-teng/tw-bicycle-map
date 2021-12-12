import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { BikeShape } from 'src/app/model';
import { BicycleLaneService } from 'src/app/service';
import { laneCityList } from '../../shared/city-list/city-list';

@Component({
  selector: 'bicycle-lane-list',
  templateUrl: './bicycle-lane-list.component.html',
  styleUrls: ['./bicycle-lane-list.component.sass'],
})
export class BicycleLaneListComponent {

  public loading: boolean;
  public cities: Array<SelectItem> = laneCityList;
  public selectedCity: SelectItem;
  public laneResult: Array<BikeShape>;
  
  constructor(private router: Router,
              private bicycleLaneService: BicycleLaneService) {}

  ngOnInit() {
    this.selectedCity = this.cities[0];
    this.onCityChange();
  }

  public navigateToIndex(): void {
    this.router.navigate(['']);
  }

  public onCityChange(): void {
    this.loading = true;
    this.bicycleLaneService.getLaneByCity(this.selectedCity.value).subscribe(res => {
      this.laneResult = res;
      this.laneResult.forEach(lane => {
        lane.CyclingLength = +(lane.CyclingLength/1000).toFixed(2)
      })
      setTimeout(() => this.loading = false, 800);
    })
  }

  public navigateToMap(lane: BikeShape): void {
    this.router.navigate(['bicycle-lane-map'], {
      queryParams: {
        city: this.selectedCity.value,
        routeName: lane.RouteName
      }
    });
  }

}
