// Angular
import { NgModule } from '@angular/core';
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
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
