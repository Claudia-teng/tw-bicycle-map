import { Component, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BikeShape } from 'src/app/model';
import { BicycleLaneService } from 'src/app/service/bicycle-lane.service';
declare var google: any

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

  public lane: BikeShape;
  public city: string;
  public routeName: string;
  
  constructor(private router: Router,
              private route: ActivatedRoute,
              private location: Location,
              private bicycleLaneService: BicycleLaneService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(res => {
      this.city = res.city;
      this.routeName = res.routeName;
      this.infoWindow = new google.maps.InfoWindow();
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
      this.lane.GeometryArray = this.lane.Geometry.split(',').map(position => position.split(' '))
      // console.log('this.lane.GeometryArray', this.lane.GeometryArray)

      let polyLineLocation = [];
      this.lane.GeometryArray.forEach(position => {
        polyLineLocation.push({
          lat: +position[1],
          lng: +position[0]
        })
      });
      
      // center
      this.options = {
        center: {lat: +polyLineLocation[0].lat, lng: +polyLineLocation[0].lng},
        zoom: 15
      } 
      // console.log('this.options.center', this.options.center)

      // polygon
      const lineSymbol = {
        path: "M 0,-1 0,1",
        strokeOpacity: 1,
        scale: 4,
      };

      this.overlays.push(new google.maps.Polyline(
        { path: polyLineLocation, 
          geodesic: true,  
          strokeOpacity: 0,
          icons: [
            {
              icon: lineSymbol,
              offset: "0",
              repeat: "20px",
            },
          ]
        }));

      // marker
      this.overlays.push(new google.maps.Marker(
        { position: {lat: +polyLineLocation[0].lat, lng: +polyLineLocation[0].lng},
          icon:  'assets/lane-start-icon.png'
      }));
      this.overlays.push(new google.maps.Marker(
        { position: {lat: +polyLineLocation[polyLineLocation.length-1].lat, lng: +polyLineLocation[polyLineLocation.length-1].lng},
          icon:  'assets/lane-end-icon.png'
      }))

    })
  }

}
