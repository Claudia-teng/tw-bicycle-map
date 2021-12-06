import { Component } from '@angular/core';

@Component({
  selector: 'youbike-stop',
  templateUrl: './youbike-stop.component.html',
  styleUrls: ['./youbike-stop.component.sass']
})
export class YoubikeStopComponent {
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
