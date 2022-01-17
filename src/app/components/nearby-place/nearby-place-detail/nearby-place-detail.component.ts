import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RestaurantTourismInfo, ScenicSpotTourismInfo } from 'src/app/model';
import { NearbyPlaceService } from 'src/app/service';


@Component({
  selector: 'nearby-place-detail',
  templateUrl: './nearby-place-detail.component.html',
  styleUrls: ['./nearby-place-detail.component.sass']
})
export class NearbyPlaceDetailComponent {

  public loading: boolean;

  public city: string;
  public isSpot: boolean = false;
  public placeName: string;
  public spotDetail: ScenicSpotTourismInfo;
  public foodDetail: RestaurantTourismInfo;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private nearbyPlaceService: NearbyPlaceService) {}

  ngOnInit() {
    this.loading = true;
    this.route.queryParams.subscribe(
      (params: Params) => {
        this.placeName = params.placeName;
        this.isSpot = params.isSpot === 'Y' ? true : false;
        this.queryPlaceDetail();
      }
    );
  }

  public navigateToPlaceList(): void {
    this.router.navigate(['nearby-place-list']);
  }

  public navigateToPlaceMap(): void {
    this.router.navigate(['nearby-place-map'], {
      queryParams: {
        placeName: this.isSpot ? this.spotDetail.ScenicSpotName : this.foodDetail.RestaurantName,
        locationLat: this.isSpot ? this.spotDetail.Position.PositionLat : this.foodDetail.Position.PositionLat,
        locationLon: this.isSpot ? this.spotDetail.Position.PositionLon : this.foodDetail.Position.PositionLon,
      }
    });
  }

  public queryPlaceDetail(): void {
    if (this.isSpot) {
      this.nearbyPlaceService.getSpotByName(this.placeName).subscribe(res => {
        this.spotDetail = res[0];
        setTimeout(() => this.loading = false, 800);
      });
    } else {
      this.nearbyPlaceService.getRestuarantByName(this.placeName).subscribe(res => {
        this.foodDetail = res[0];
        setTimeout(() => this.loading = false, 800);
      });
    }
  }

}
