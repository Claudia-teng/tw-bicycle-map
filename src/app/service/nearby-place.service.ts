import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ScenicSpotTourismInfo, RestaurantTourismInfo } from "../model";

@Injectable({ providedIn: 'root' })
export class NearbyPlaceService {

  constructor(
    private http: HttpClient,
  ) { }

  public getSpotsByCity(city: string): Observable<Array<ScenicSpotTourismInfo>>{
    return this.http.get<Array<ScenicSpotTourismInfo>>(`https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/${city}`);
  }

  public getRestuarantByCity(city: string): Observable<Array<RestaurantTourismInfo>>{
    return this.http.get<Array<RestaurantTourismInfo>>(`https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant/${city}`);
  }


}

