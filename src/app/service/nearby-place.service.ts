import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ScenicSpotTourismInfo, RestaurantTourismInfo } from "../model";

@Injectable({ providedIn: 'root' })
export class NearbyPlaceService {

  constructor(
    private http: HttpClient,
  ) { }

  public getSpotsByCity(lat: number, lon: number): Observable<Array<ScenicSpotTourismInfo>>{
    return this.http.get<Array<ScenicSpotTourismInfo>>(`https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$spatialFilter=nearby(${lat}, ${lon}, 1000)&$format=JSON`);
  }

  public getSpotByName(name: string): Observable<Array<ScenicSpotTourismInfo>>{
    return this.http.get<Array<ScenicSpotTourismInfo>>(`https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$filter=contains(Name,'${name}')&$format=JSON`);
  }

  public getRestuarantByCity(lat: number, lon: number): Observable<Array<RestaurantTourismInfo>>{
    return this.http.get<Array<RestaurantTourismInfo>>(`https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant?$spatialFilter=nearby(${lat}, ${lon}, 1000)&$format=JSON`);
  }

  public getRestuarantByName(name: string): Observable<Array<RestaurantTourismInfo>>{
    return this.http.get<Array<RestaurantTourismInfo>>(`https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant?$filter=contains(Name,'${name}')&$format=JSON`);
  }


}

