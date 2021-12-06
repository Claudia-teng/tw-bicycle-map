// Angular
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
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

// Lottie
import { LottieModule } from 'ngx-lottie';

export function playerFactory() { 
  return import('lottie-web'); 
} 

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    BicycleLaneComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    GMapModule,
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
