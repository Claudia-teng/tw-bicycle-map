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
import { BicycleLaneComponent } from './components/bicycle-lane/bicycle-lane.component';

// PrimeNG
import { GMapModule } from 'primeng/gmap';
import { DropdownModule } from 'primeng/dropdown';

// Lottie
import { LottieModule } from 'ngx-lottie';
import { YoubikeStopComponent } from './components/youbike-stop/youbike-stop.component';

export function playerFactory() { 
  return import('lottie-web'); 
} 

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    YoubikeStopComponent,
    BicycleLaneComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    GMapModule,
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
