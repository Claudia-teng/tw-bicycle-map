import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BikeAvailability, BikeStation } from "../model";

@Injectable({ providedIn: 'root' })
export class YoubikeStopService {

  constructor(
    private http: HttpClient,
  ) { }

  public getNearbyStop(lat: number, lon: number): Observable<Array<BikeStation>>{
    return this.http.get<Array<BikeStation>>(`https://ptx.transportdata.tw/MOTC/v2/Bike/Station/NearBy?$spatialFilter=nearby(${lat}, ${lon}, 500)&$format=JSON`);
  }

  public getNearbyAvailability(lat: number, lon: number): Observable<Array<BikeAvailability>>{
    return this.http.get<Array<BikeAvailability>>(`https://ptx.transportdata.tw/MOTC/v2/Bike/Availability/NearBy?$spatialFilter=nearby(${lat}, ${lon}, 500)&$format=JSON`);
  }

  public getStationByCity(city: string, input?: string): Observable<Array<BikeStation>>{
    if (!input) {
      return this.http.get<Array<BikeStation>>(`https://ptx.transportdata.tw/MOTC/v2/Bike/Station/${city}`);
    } else {
      return this.http.get<Array<BikeStation>>(`https://ptx.transportdata.tw/MOTC/v2/Bike/Station/${city}?$filter=contains(StationName/Zh_tw,'${input}')&$format=JSON`);
    }
  }

  public getAvailabilityByCity(city: string): Observable<Array<BikeAvailability>>{
    return this.http.get<Array<BikeAvailability>>(`https://ptx.transportdata.tw/MOTC/v2/Bike/Availability/${city}`);
  }

}