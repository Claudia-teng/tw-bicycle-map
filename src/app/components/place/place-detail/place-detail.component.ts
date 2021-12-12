import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RestaurantTourismInfo, ScenicSpotTourismInfo } from 'src/app/model';
import { PlaceService } from 'src/app/service';


@Component({
  selector: 'place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.sass']
})
export class PlaceDetailComponent {

  public loading: boolean;

  public city: string;
  public isSpot: boolean;
  public placeName: string;
  public spotDetail: ScenicSpotTourismInfo;
  public foodDetail: RestaurantTourismInfo;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private placeService: PlaceService) {}

  ngOnInit() {
    this.loading = true;
    this.route.queryParams.subscribe(
      (params: Params) => {
        this.placeName = params.placeName;
        this.city = params.city;
        this.isSpot = params.isSpot;
        this.queryPlaceDetail();
      }
    );
  }

  public navigateToPlaceList(): void {
    this.router.navigate(['place-list']);
  }

  public navigateToPlaceMap(): void {
    this.router.navigate(['place-map'], {
      queryParams: {
        placeName: this.isSpot ? this.spotDetail.Name : this.foodDetail.Name,
        locationLat: this.isSpot ? this.spotDetail.Position.PositionLat : this.foodDetail.Position.PositionLat,
        locationLon: this.isSpot ? this.spotDetail.Position.PositionLon : this.foodDetail.Position.PositionLon,
      }
    });
  }

  public queryPlaceDetail(): void {
    if (this.isSpot) {
      this.placeService.getSpotByName(this.city, this.placeName).subscribe(res => {
        this.spotDetail = res[0];
        setTimeout(() => this.loading = false, 800);
      });
    } else {
      this.placeService.getRestuarantByName(this.city, this.placeName).subscribe(res => {
        this.foodDetail = res[0];
        setTimeout(() => this.loading = false, 800);
      });
    }
  }

}
