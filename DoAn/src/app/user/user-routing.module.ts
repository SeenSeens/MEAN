import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ShopComponent} from "../pages/shop/shop.component";
import {ProductComponent} from "../pages/product/product.component";
import {ProductDetailsComponent} from "../pages/product-details/product-details.component";
import {CartComponent} from "../pages/cart/cart.component";
import {CheckoutComponent} from "../pages/checkout/checkout.component";
const routes: Routes = [
  { path: '', redirectTo: 'shop', pathMatch: 'full' },
  { path: 'shop', component: ShopComponent },
  { path: 'product', component: ProductComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
