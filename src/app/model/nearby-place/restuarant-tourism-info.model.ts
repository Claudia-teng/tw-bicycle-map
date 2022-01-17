import { TourismPicture, PointType } from "../index"

export interface RestaurantTourismInfo {
  ID: string,
  RestaurantID: string
  RestaurantName?: string,
  Description?: string,
  Address?: string,
  ZipCode?: string,
  Phone?: string,
  OpenTime?: string,
  WebsiteUrl?: string,
  Picture?: TourismPicture,
  Position?: PointType,
  Class?: string,
  MapUrl?: string,
  ParkingInfo?: string,
  City?: string,
  SrcUpdateTime: string,
  UpdateTime?: string
}
