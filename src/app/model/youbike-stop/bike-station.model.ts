import { NameType } from "./name-type.model";
import { PointType } from "./point-type.model";

export interface BikeStation {
  StationUID?: string,
  StationID?: string,
  AuthorityID?: string,
  StationName?: NameType,
  StationPosition?: PointType,
  StationAddress?: NameType,
  StopDescription?: string,
  BikesCapacity?: number,
  ServiceType?: number,
  SrcUpdateTime?: string,
  UpdateTime: string,
  AvailableRentBikes?: number,
  AvailableReturnBikes?: number,
}