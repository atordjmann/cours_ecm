import { UserService } from './logging/services/user.service';
import { ErrorInterceptor } from './logging/helpers/error.interceptor';
import { JwtInterceptor } from './logging/helpers/jwt.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSliderModule} from '@angular/material/slider';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { OffersComponent } from './offers/offers.component';
import { LoggingComponent } from './logging/logging.component';
import { ProfileComponent } from './profile/profile.component';
import { FilterComponent } from './offers/filter/filter.component';
import { OfferPreviewComponent } from './offers/offer-preview/offer-preview.component';
import { OfferDetailComponent } from './offers/offer-detail/offer-detail.component';
import { ModalLoginComponent } from './logging/modal-login/modal-login.component';
import { RegisterFormComponent } from './logging/register-form/register-form.component';
import { ProfileDetailComponent } from './profile/profile-detail/profile-detail.component';
import { ApplicationComponent } from './profile/application/application.component';
import { NotificationComponent } from './profile/notification/notification.component';
import { OfferSquareComponent } from './profile/application/offer-square/offer-square.component';
import { OfferCompanyComponent } from './profile/application/offer-company/offer-company.component';

import { GlobalService } from './global.service';
import { OfferViewService } from './offers/offerView.service';
import { AlertComponent } from './alert/alert.component';

//import { fakeBackendProvider } from '../app/logging/helpers';
import { FaqComponent } from './faq/faq.component';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    OffersComponent,
    LoggingComponent,
    ProfileComponent,
    FilterComponent,
    OfferPreviewComponent,
    OfferDetailComponent,
    ModalLoginComponent,
    RegisterFormComponent,
    ProfileDetailComponent,
    ApplicationComponent,
    NotificationComponent,
    OfferSquareComponent,
    OfferCompanyComponent,
    AlertComponent,
    FaqComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatSliderModule,
    MatAutocompleteModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule
  ],
  providers: [GlobalService, OfferViewService, UserService,
              {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
              {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
