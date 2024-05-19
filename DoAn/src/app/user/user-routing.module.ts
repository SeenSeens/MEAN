import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "../pages/home/home.component";
import {AppLayoutComponent} from "../layout/app-layout/app-layout.component";
import {ShopComponent} from "../pages/shop/shop.component";
import {ProductComponent} from "../pages/product/product.component";
import {ProductDetailsComponent} from "../pages/product-details/product-details.component";
import {CartComponent} from "../pages/cart/cart.component";
import {CheckoutComponent} from "../pages/checkout/checkout.component";

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
    ]
  }


      // Redirect to user by default
      // { path: '**', redirectTo: '/' } // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
