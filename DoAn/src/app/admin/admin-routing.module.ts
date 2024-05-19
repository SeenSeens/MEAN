import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginAdminComponent} from "../pages/admin/login-admin/login-admin.component";
import {AdminLayoutComponent} from "../layout/admin-layout/admin-layout.component";
import {authGuard} from "../guard/auth.guard";
import {DashboardComponent} from "../pages/admin/dashboard/dashboard.component";
import {ProductAdminComponent} from "../pages/admin/product-admin/product-admin.component";
import {AddProductComponent} from "../pages/admin/add-product/add-product.component";
import {EditProductComponent} from "../pages/admin/edit-product/edit-product.component";
import {AccountComponent} from "../pages/admin/account/account.component";
import {CategoryAdminComponent} from "../pages/admin/category-admin/category-admin.component";
import {AddCategoryComponent} from "../pages/admin/add-category/add-category.component";
import {EditCategoryComponent} from "../pages/admin/edit-category/edit-category.component";

const routes: Routes = [
  { path: 'login', component: LoginAdminComponent },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'product', component: ProductAdminComponent },
      { path: 'add-product', component: AddProductComponent },
      { path: 'edit-product/:id', component: EditProductComponent },
      { path: 'account', component: AccountComponent },
      { path: 'category', component: CategoryAdminComponent },
      { path: 'add-category', component: AddCategoryComponent },
      { path: 'edit-category/:id', component: EditCategoryComponent }
    ]
  },
  { path: '**', redirectTo: 'login' },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
