import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BikeShape } from "../model";

@Injectable({ providedIn: 'root' })
export class BicycleLaneService {

  constructor(
    private http: HttpClient,
  ) { }

  public getLaneByCity(city: string, name?: string): Observable<Array<BikeShape>>{
    if (!name) {
      return this.http.get<Array<BikeShape>>(`https://ptx.transportdata.tw/MOTC/v2/Cycling/Shape/${city}`);
    } else {
      return this.http.get<Array<BikeShape>>(`https://ptx.transportdata.tw/MOTC/v2/Cycling/Shape/${city}?$filter=contains(RouteName,'${name}')&$format=JSON`);
    }
  }
}