import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BikeShape } from "../model";

@Injectable({ providedIn: 'root' })
export class NearbyService {

  constructor(
    private http: HttpClient,
  ) { }

  public getLaneByCity(city: string): Observable<Array<BikeShape>>{
    return this.http.get<Array<BikeShape>>(`https://ptx.transportdata.tw/MOTC/v2/Cycling/Shape/${city}`);
  }

}