import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminLayoutComponent} from "../layout/admin-layout/admin-layout.component";
import {DashboardComponent} from "../pages/admin/dashboard/dashboard.component";
import {ProductAdminComponent} from "../pages/admin/product-admin/product-admin.component";
import {AddProductComponent} from "../pages/admin/add-product/add-product.component";
import {EditProductComponent} from "../pages/admin/edit-product/edit-product.component";
import {AccountComponent} from "../pages/admin/account/account.component";
import {CategoryAdminComponent} from "../pages/admin/category-admin/category-admin.component";
import {AddCategoryComponent} from "../pages/admin/add-category/add-category.component";
import {EditCategoryComponent} from "../pages/admin/edit-category/edit-category.component";
import {LoginAdminComponent} from "../pages/admin/login-admin/login-admin.component";
import {CategorySelectComponent} from "../shared/category-select/category-select.component";
import {ProductFormComponent} from "../shared/product-form/product-form.component";
import {AdminRoutingModule} from "./admin-routing.module";
import {VndPipeModule} from "../vnd-pipe.module";
import {ReactiveFormsModule} from "@angular/forms";
import {EditorModule} from "@tinymce/tinymce-angular";
import {provideClientHydration} from "@angular/platform-browser";
import {provideHttpClient, withFetch} from "@angular/common/http";
import {AuthService} from "../services/auth.service";
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";

@NgModule({
  declarations: [
    AdminLayoutComponent,
    DashboardComponent,
    ProductAdminComponent,
    AddProductComponent,
    EditProductComponent,
    AccountComponent,
    CategoryAdminComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    LoginAdminComponent,
    CategorySelectComponent,
    ProductFormComponent,
  ],
  imports: [
    CommonModule,
    EditorModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    VndPipeModule.forRoot()
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    AuthService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
})
export class AdminModule { }
