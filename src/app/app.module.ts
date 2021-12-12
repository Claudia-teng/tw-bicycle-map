// Angular
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Component
import { appRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { AuthInterceptorService } from './auth/auth.intercepter.service';
import { IndexComponent } from './components/index/index.component';
import { BicycleLaneListComponent } from './components/bicycle-lane/bicycle-lane-list/bicycle-lane-list.component';
import { YoubikeStopComponent } from './components/youbike-stop/youbike-stop.component';
import { BicycleLaneMapComponent } from './components/bicycle-lane/bicycle-lane-map/bicycle-lane-map.component';
import { YoubikeStopLeafletComponent } from './components/youbike-stop/youbike-stop-leaflet/youbike-stop-leaflet.component';
import { BicycleLaneLeafletComponent } from './components/bicycle-lane/bicycle-lane-map/bicycle-lane-leaflet/bicycle-lane-leaflet.component';
import { PlaceListComponent } from './components/place/place-list/place-list.component';
import { PlaceDetailComponent } from './components/place/place-detail/place-detail.component';
import { PlaceMapComponent } from './components/place/place-map/place-map.component';

// PrimeNG
import { GMapModule } from 'primeng/gmap';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';

// Lottie
import { LottieModule } from 'ngx-lottie';


export function playerFactory() { 
  return import('lottie-web'); 
} 

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    YoubikeStopComponent,
    BicycleLaneListComponent,
    BicycleLaneMapComponent,
    YoubikeStopLeafletComponent,
    BicycleLaneLeafletComponent,
    PlaceListComponent,
    PlaceDetailComponent,
    PlaceMapComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    GMapModule,
    DropdownModule,
    PaginatorModule,
    LottieModule.forRoot({ player: playerFactory }),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
