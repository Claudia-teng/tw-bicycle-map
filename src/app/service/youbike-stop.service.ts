import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BikeAvailability, BikeStation } from "../model";

@Injectable({ providedIn: 'root' })
export class NearbyService {

  constructor(
    private http: HttpClient,
  ) { }

  public getNearbyStop(): Observable<Array<BikeStation>>{
    return this.http.get<Array<BikeStation>>(`https://ptx.transportdata.tw/MOTC/v2/Bike/Station/NearBy`);
  }

  public getNearbyAvailability(lat: number, lon: number): Observable<Array<BikeAvailability>>{
    return this.http.get<Array<BikeAvailability>>(`https://ptx.transportdata.tw/MOTC/v2/Bike/Availability/NearBy?$spatialFilter=nearby(${lat}, ${lon}, 300)&$format=JSON`);
  }

  public getStationByCity(city: string): Observable<Array<BikeStation>>{
    return this.http.get<Array<BikeStation>>(`https://ptx.transportdata.tw/MOTC/v2/Bike/Station/${city}`);
  }

  public getAvailabilityByCity(city: string): Observable<Array<BikeAvailability>>{
    return this.http.get<Array<BikeAvailability>>(`https://ptx.transportdata.tw/MOTC/v2/Bike/Availability/${city}`);
  }

}