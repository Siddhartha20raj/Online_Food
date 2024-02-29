import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FoodListComponent } from './food-list/food-list.component';
import { CartComponent } from './cart/cart.component';
import { ActivatedRouteSnapshot, Router, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FoodBoxService } from './food-box.service';
import { HeaderComponent } from './header/header.component';
import { CategoryManagementComponent } from './category-management/category-management.component';
import { FoodItemsManagementComponent } from './food-items-management/food-items-management.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminSigninSignupComponent } from './admin-signin-signup/admin-signin-signup.component';
import { UserSigninSignupComponent } from './user-signin-signup/user-signin-signup.component';
import { HomeComponent } from './home/home.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { FooterComponent } from './footer/footer.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { PaymentComponent } from './payment/payment.component';
import { ReviewComponent } from './review/review.component';
import { ManageQueryComponent } from './manage-query/manage-query.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ViewOrdersComponent } from './view-orders/view-orders.component';
import { ViewReviewsComponent } from './view-reviews/view-reviews.component';
 
const canActivateAdmin = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot,router:Router) => {
  const adminSession = sessionStorage.getItem('adminSession');
  
  if (adminSession) {
    return true;
  } else {
    router.navigate(['/']); 
    return false;
  }
};

const canActivateUser = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot,router:Router) => {
  const userSession = sessionStorage.getItem('userSession');
  
  if (userSession) {
    return true;
  } else {
    router.navigate(['/']); 
    return false;
  }
};




const routes: Routes = [
  {
    "path": "",
    "component": HomeComponent
  },
  {
    "path": "foodlist",
    "component": FoodListComponent,
    "canActivate": [canActivateUser]
  },
  {
    "path": "cart",
    "component": CartComponent,
    "canActivate": [canActivateUser]
  },
  {
    "path": "manage-categories",
    "component": CategoryManagementComponent,
    "canActivate": [canActivateAdmin]
  },
  {
    "path":"admin-dashboard",
    "component":AdminDashboardComponent,
    "canActivate":[canActivateAdmin]
  },
  { 
    "path": "category/:categoryId/food-items", 
    "component": FoodItemsManagementComponent ,
    "canActivate":[canActivateAdmin]
  },
  { 
    "path": "payment/:email", 
    "component": PaymentComponent,
    "canActivate":[canActivateUser]
  },
  { 
    "path": "order-summary/:orderId", 
    "component":OrderSummaryComponent,
    "canActivate": [canActivateUser]
  },
  {
    "path":"admin-login-register",
    "component": AdminSigninSignupComponent,
  },
  {
    "path":"user-login-register",
    "component": UserSigninSignupComponent,
  },
  {
    "path":"user-dashboard",
    "component":UserDashboardComponent,
    "canActivate": [canActivateUser]
  },
  {
    "path":"contact-us",
    "component": ContactusComponent,
  },
  {
    "path":"about-us",
    "component": AboutusComponent,
  },
  {
    "path":"review",
    "component":ReviewComponent,
    "canActivate": [canActivateUser]
  },
  {
    "path":"view-orders",
    "component":ViewOrdersComponent,
    "canActivate": [canActivateAdmin]
  },
  {
    "path":"view-reviews",
    "component":ViewReviewsComponent,
    "canActivate": [canActivateAdmin]
  },
  {
    "path":"manage-queries",
    "component":ManageQueryComponent,
    "canActivate": [canActivateAdmin]
  }
  

]
@NgModule({
  declarations: [
    AppComponent,
    FoodListComponent,
    CartComponent,
    HeaderComponent,
    CategoryManagementComponent,
    FoodItemsManagementComponent,
    AdminSigninSignupComponent,
    AdminDashboardComponent,
    UserSigninSignupComponent,
    HomeComponent,
    UserDashboardComponent,
    AboutusComponent,
    ContactusComponent,
    FooterComponent,
    OrderSummaryComponent,
    PaymentComponent,
    ReviewComponent,
    ManageQueryComponent,
    ViewReviewsComponent,
    ViewOrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule.forRoot(routes)
  ],
  providers: [FoodBoxService],
  bootstrap: [AppComponent]
})
export class AppModule { }
