import { Routes } from "@angular/router";
import { BicycleLaneListComponent } from "./components/bicycle-lane/bicycle-lane-list/bicycle-lane-list.component";
import { BicycleLaneMapComponent } from "./components/bicycle-lane/bicycle-lane-map/bicycle-lane-map.component";
import { IndexComponent } from "./components/index/index.component";
import { NearbyPlaceDetailComponent } from "./components/nearby-place/nearby-place-detail/nearby-place-detail.component";
import { NearbyPlaceListComponent } from "./components/nearby-place/nearby-place-list/nearby-place-list.component";
import { NearbyPlaceMapComponent } from "./components/nearby-place/nearby-place-map/nearby-place-map.component";
import { YoubikeStopMapComponent } from "./components/youbike-stop/youbike-stop-map/youbike-stop-map.component";


export const appRoutes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'youbike-stop', component: YoubikeStopMapComponent },
  { path: 'bicycle-lane-list', component: BicycleLaneListComponent },
  { path: 'bicycle-lane-map', component: BicycleLaneMapComponent },
  { path: 'nearby-place-list', component: NearbyPlaceListComponent },
  { path: 'nearby-place-detail', component: NearbyPlaceDetailComponent },
  { path: 'nearby-place-map', component: NearbyPlaceMapComponent }
]