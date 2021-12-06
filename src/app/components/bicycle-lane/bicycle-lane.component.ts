import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { cityList } from './city-list/city-list';

@Component({
  selector: 'bicycle-lane',
  templateUrl: './bicycle-lane.component.html',
  styleUrls: ['./bicycle-lane.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class BicycleLaneComponent {

  public loading: boolean;
  public cities: Array<SelectItem> = cityList;
  public selectedCity: SelectItem;
  
  constructor(private router: Router) {}

  ngOnInit() {
    this.selectedCity = this.cities[0];
  }

  public navigateToIndex(): void {
    this.router.navigate(['']);
  }

}
