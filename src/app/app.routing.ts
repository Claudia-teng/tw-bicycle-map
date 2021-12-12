import { Routes } from "@angular/router";
import { BicycleLaneListComponent } from "./components/bicycle-lane/bicycle-lane-list/bicycle-lane-list.component";
import { BicycleLaneMapComponent } from "./components/bicycle-lane/bicycle-lane-map/bicycle-lane-map.component";
import { IndexComponent } from "./components/index/index.component";
import { PlaceDetailComponent } from "./components/place/place-detail/place-detail.component";
import { PlaceListComponent } from "./components/place/place-list/place-list.component";
import { PlaceMapComponent } from "./components/place/place-map/place-map.component";
import { YoubikeStopComponent } from "./components/youbike-stop/youbike-stop.component";

export const appRoutes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'youbike-stop', component: YoubikeStopComponent },
  { path: 'bicycle-lane-list', component: BicycleLaneListComponent },
  { path: 'bicycle-lane-map', component: BicycleLaneMapComponent },
  { path: 'place-list', component: PlaceListComponent },
  { path: 'place-detail', component: PlaceDetailComponent },
  { path: 'place-map', component: PlaceMapComponent }
]