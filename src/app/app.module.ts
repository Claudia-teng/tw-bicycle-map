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
import { BicycleLaneLeafletComponent } from './components/bicycle-lane/bicycle-lane-map/bicycle-lane-leaflet/bicycle-lane-leaflet.component';
import { BicycleLaneMapComponent } from './components/bicycle-lane/bicycle-lane-map/bicycle-lane-map.component';
import { YoubikeStopLeafletComponent } from './components/youbike-stop/youbike-stop-map/youbike-stop-leaflet/youbike-stop-leaflet.component';
import { YoubikeStopMapComponent } from './components/youbike-stop/youbike-stop-map/youbike-stop-map.component';
import { NearbyPlaceDetailComponent } from './components/nearby-place/nearby-place-detail/nearby-place-detail.component';
import { NearbyPlaceMapComponent } from './components/nearby-place/nearby-place-map/nearby-place-map.component';
import { NearbyPlaceListComponent } from './components/nearby-place/nearby-place-list/nearby-place-list.component';

// PrimeNG
import { DropdownModule } from 'primeng/dropdown';;

// Lottie
import { LottieModule } from 'ngx-lottie';



export function playerFactory() { 
  return import('lottie-web'); 
} 

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    YoubikeStopMapComponent,
    BicycleLaneListComponent,
    BicycleLaneMapComponent,
    YoubikeStopLeafletComponent,
    BicycleLaneLeafletComponent,
    NearbyPlaceListComponent,
    NearbyPlaceDetailComponent,
    NearbyPlaceMapComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    DropdownModule,
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
