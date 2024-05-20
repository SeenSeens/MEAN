import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {ShopComponent} from "./pages/shop/shop.component";
import {ProductComponent} from "./pages/product/product.component";
import {ProductDetailsComponent} from "./pages/product-details/product-details.component";
import {CartComponent} from "./pages/cart/cart.component";
import {CheckoutComponent} from "./pages/checkout/checkout.component";
const routes: Routes = [


  {
    path: '',
    loadChildren: () => new Promise(resolve => {
      setTimeout(() => {
        resolve(import('./user/user.module').then(module => module.UserModule));
      }, 200); // Thêm độ trễ 500ms
    })
  },
  {
    path: 'admin',
    loadChildren: () => new Promise(resolve => {
      setTimeout(() => {
        resolve(import('./admin/admin.module').then(module => module.AdminModule));
      }, 200); // Thêm độ trễ 500ms
    })
  },
  { path: '', redirectTo: '/', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
