import { Routes } from "@angular/router";
import { BicycleLaneComponent } from "./components/bicycle-lane/bicycle-lane.component";
import { IndexComponent } from "./components/index/index.component";
import { YoubikeStopComponent } from "./components/youbike-stop/youbike-stop.component";

export const appRoutes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'youbike-stop', component: YoubikeStopComponent },
  { path: 'bicycle-lane', component: BicycleLaneComponent },
  // { path: 'nearby-place', component: BicycleLaneComponent }
]