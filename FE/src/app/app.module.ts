import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './main-view/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterModule } from '@angular/router';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { StarRatingModule } from 'angular-star-rating';
import { StarRatingComponent } from './main-view/star-rating/star-rating.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { BookListComponent } from './main-view/book-list/book-list.component';
import { BookCarouselComponent } from './main-view/book-carousel/book-carousel.component';
import { FooterComponent } from './main-view/footer/footer.component';
import { ContentsComponent } from './item-details/contents/contents.component';
import { PageViewComponent } from './item-details/page-view/page-view.component';
import { PageViewFooterComponent } from './item-details/page-view-footer/page-view-footer.component';
import { PageViewNavbarComponent } from './item-details/page-view-navbar/page-view-navbar.component';
import { PaymentNavbarComponent } from './payment/payment-navbar/payment-navbar.component';
import { PaymentContentsComponent } from './payment/payment-contents/payment-contents.component';
import { PaymentFooterComponent } from './payment/payment-footer/payment-footer.component';
import { PaymentViewComponent } from './payment/payment-view/payment-view.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { AdminNavbarComponent } from './admin-view-page/admin-navbar/admin-navbar.component';
import { AdminManageTableComponent } from './admin-manage-cart/admin-manage-table/admin-manage-table.component';
import { AdminManageNavbarComponent } from './admin-manage-cart/admin-manage-navbar/admin-manage-navbar.component';
import { LoadingComponent } from './loading/loading.component';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {
  SocialLoginModule,
  SocialAuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
  GoogleSigninButtonModule
} from '@abacritt/angularx-social-login';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContactpopupComponent } from './contactpopup/contactpopup.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { FixedsidenavComponent } from './main-view/fixedsidenav/fixedsidenav.component';
import { FileinputComponent } from './fileinput/fileinput.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    NavbarComponent,
    BookListComponent,
    StarRatingComponent,
    BookCarouselComponent,
    FooterComponent,
    ContentsComponent,
    PageViewComponent,
    PageViewFooterComponent,
    PageViewNavbarComponent,
    PaymentNavbarComponent,
    PaymentContentsComponent,
    PaymentFooterComponent,
    PaymentViewComponent,
    ChatbotComponent,
    AdminNavbarComponent,
    AdminManageTableComponent,
    AdminManageNavbarComponent,
    LoadingComponent,
    ContactpopupComponent,
    FixedsidenavComponent,
    FileinputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatBadgeModule,
    RouterModule,
    MatInputModule,
    StarRatingModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatFormFieldModule,
    CommonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
    NgbModule,
    RouterModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '909995606336-73ej7sroh4gj4taf2ql38kivsbg8n4qa.apps.googleusercontent.com'   
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(
              '2561539450714005'   
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
