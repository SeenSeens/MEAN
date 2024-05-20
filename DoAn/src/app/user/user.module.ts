import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatPaginatorModule} from "@angular/material/paginator";
import {provideHttpClient, withFetch} from "@angular/common/http";
import {provideClientHydration} from "@angular/platform-browser";
import {HeaderComponent} from "../shared/header/header.component";
import {FooterComponent} from "../shared/footer/footer.component";
import {NewsletterFormComponent} from "../shared/newsletter-form/newsletter-form.component";
import {SearchComponent} from "../shared/search/search.component";
import {HomeComponent} from "../pages/home/home.component";
import {ShopComponent} from "../pages/shop/shop.component";
import {ProductDetailsComponent} from "../pages/product-details/product-details.component";
import {CartComponent} from "../pages/cart/cart.component";
import {CheckoutComponent} from "../pages/checkout/checkout.component";
import {AppLayoutComponent} from "../layout/app-layout/app-layout.component";
import {VndPipeModule} from "../vnd-pipe.module";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NewsletterFormComponent,
    SearchComponent,
    HomeComponent,
    ShopComponent,
    ProductDetailsComponent,
    CartComponent,
    CheckoutComponent,
    AppLayoutComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    VndPipeModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
  ],
})
export class UserModule { }
