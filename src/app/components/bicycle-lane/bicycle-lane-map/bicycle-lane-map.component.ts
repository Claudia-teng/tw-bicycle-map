import { Component, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BikeShape } from 'src/app/model';
import { BicycleLaneService } from 'src/app/service';

@Component({
  selector: 'bicycle-lane-map',
  templateUrl: './bicycle-lane-map.component.html',
  styleUrls: ['./bicycle-lane-map.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class BicycleLaneMapComponent {

  public options: any;
  public overlays: any[] = [];
  public infoWindow: any = [];

  public polyLineLocation: Array<any> = [];

  public lane: BikeShape;
  public city: string;
  public routeName: string;
  
  constructor(private route: ActivatedRoute,
              private location: Location,
              private bicycleLaneService: BicycleLaneService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(res => {
      this.city = res.city;
      this.routeName = res.routeName;
      this.getLaneInfo();
    })
  }

  public navigateToLaneList(): void {
    this.location.back()
  }

  public getLaneInfo(): void {
    this.bicycleLaneService.getLaneByCity(this.city, this.routeName).subscribe(res => {
      this.lane = res[0];
      // console.log(' this.lane',  this.lane)
      this.lane.Geometry = this.lane.Geometry.slice(18 ,this.lane.Geometry.length-3);
      this.lane.GeometryArray = this.lane.Geometry.split(',').map(position => position.split(' '));
      // console.log('this.lane.GeometryArray-1', this.lane.GeometryArray)
      this.lane.GeometryArray.map(position => position.reverse());
      this.polyLineLocation = this.lane.GeometryArray;
    })
  }

}
