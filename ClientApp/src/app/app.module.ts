import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { DateButtonDivComponent } from './date-button-div/date-button-div.component';
import { DateChangeService } from './services/date-change.service';
import { HomeContentComponent } from './home-content/home-content.component';
import { MovieComponent } from './movie/movie.component';
import { DateService } from './services/date.service';
import { CartComponent } from './cart/cart.component';
import { PaymentComponent } from './payment/payment.component';
import { OkComponent } from './ok/ok.component';
import { ErrorComponent } from './error/error.component';

import { StudentMainComponent } from './student-main/student-main.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    DateButtonDivComponent,
    HomeContentComponent,
    MovieComponent,
    CartComponent,
    PaymentComponent,
    OkComponent,
    ErrorComponent,
    StudentMainComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'movies/:id', component: MovieComponent },
      { path: 'cart/:id', component: CartComponent },
      { path: 'student-main', component: StudentMainComponent }
    ])
  ],
  providers: [DateChangeService, DateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
