import { Routes } from "@angular/router";
import { BicycleLaneComponent } from "./components/bicycle-lane/bicycle-lane.component";
import { IndexComponent } from "./components/index/index.component";

export const appRoutes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'bicycle-lane', component: BicycleLaneComponent}
]