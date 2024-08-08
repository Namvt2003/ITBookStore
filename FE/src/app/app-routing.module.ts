import { ComponentFixture } from '@angular/core/testing';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { NavbarComponent } from './main-view/navbar/navbar.component';
import { PageViewComponent } from './item-details/page-view/page-view.component';
import { PaymentViewComponent } from './payment/payment-view/payment-view.component';
import { AdminNavbarComponent } from './admin-view-page/admin-navbar/admin-navbar.component';
import { AdminManageTableComponent } from './admin-manage-cart/admin-manage-table/admin-manage-table.component';
import { ContactpopupComponent } from './contactpopup/contactpopup.component';
import { FileinputComponent } from './fileinput/fileinput.component';
 

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginPageComponent},
  {path:'main-page', component: NavbarComponent},
  {path:'book-details/:id', component: PageViewComponent, pathMatch: 'prefix'},
  {path:'payment', component: PaymentViewComponent},
  {path: 'admin-view', component:   AdminNavbarComponent},
  {path: 'order-manage', component: AdminManageTableComponent},
  {path: 'contact', component: ContactpopupComponent},
  {path: 'fileInput', component: FileinputComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
