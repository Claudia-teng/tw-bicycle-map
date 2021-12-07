import { Component, ViewEncapsulation } from '@angular/core';
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
              private bicycleLaneService: BicycleLaneService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(res => {
      this.city = res.city;
      this.routeName = res.routeName;
      this.infoWindow = new google.maps.InfoWindow();
      this.getLaneInfo();
    });
  }

  public navigateToIndex(): void {
    this.router.navigate(['']);
  }

  public getLaneInfo(): void {
    this.bicycleLaneService.getLaneByCity(this.city, this.routeName).subscribe(res => {
      this.lane = res[0];
      // console.log(' this.lane',  this.lane)
      this.lane.Geometry = this.lane.Geometry.slice(18 ,this.lane.Geometry.length-3);
      this.lane.GeometryArray = this.lane.Geometry.split(',').map(position => position.split(' '))
      // console.log('this.lane.GeometryArray', this.lane.GeometryArray)

      let polygonLocation = [];
      this.lane.GeometryArray.forEach(position => {
        polygonLocation.push({
          lat: +position[1],
          lng: +position[0]
        })
      });
      console.log('polygonLocation', polygonLocation)
      
      // center
      this.options = {
        center: {lat: +polygonLocation[0].lat, lng: +polygonLocation[0].lng},
        zoom: 17
      };

      console.log('this.options.center', this.options.center)

      // polygon
      this.overlays.push(new google.maps.Polyline(
        { path: polygonLocation, 
          geodesic: true, 
          strokeColor: '#1CC8EE', 
          strokeOpacity: 1, 
          strokeWeight: 3 }));

      // marker
      this.overlays.push(new google.maps.Marker(
        { position: {lat: +polygonLocation[0].lat, lng: +polygonLocation[0].lng},
          icon:  'assets/lane-start-icon.png'
      }));
      this.overlays.push(new google.maps.Marker(
        { position: {lat: +polygonLocation[polygonLocation.length-1].lat, lng: +polygonLocation[polygonLocation.length-1].lng},
          icon:  'assets/lane-end-icon.png'
      }))

    })
  }

}
