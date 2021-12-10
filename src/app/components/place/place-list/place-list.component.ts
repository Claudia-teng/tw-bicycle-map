import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.sass']
})
export class PlaceListComponent {

  public isSpot: boolean;

  constructor(private router: Router) {}

  public navigateToIndex():void {
    this.router.navigate(['']);
  }

  public onToggleView(): void {

  }

}
