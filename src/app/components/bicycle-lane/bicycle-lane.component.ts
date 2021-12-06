import { Component } from '@angular/core';

@Component({
  selector: 'bicycle-lane',
  templateUrl: './bicycle-lane.component.html',
  styleUrls: ['./bicycle-lane.component.sass']
})
export class BicycleLaneComponent {
  public options: any;
  public overlays: any[];

  public isRent: boolean = true;

  ngOnInit() {
    this.options = {
        center: {lat: 36.890257, lng: 30.707417},
        zoom: 12
    };
  }

  public onToggleView(): void {
    this.isRent = !this.isRent;
  }
}
