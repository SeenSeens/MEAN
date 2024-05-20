import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, provideHttpClient, withFetch } from "@angular/common/http";
import { NgxPaginationModule } from "ngx-pagination";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {HeaderComponent} from "./shared/header/header.component";
import {FooterComponent} from "./shared/footer/footer.component";
import {NewsletterFormComponent} from "./shared/newsletter-form/newsletter-form.component";
import {SearchComponent} from "./shared/search/search.component";
import {HomeComponent} from "./pages/home/home.component";
import {ShopComponent} from "./pages/shop/shop.component";
import {ProductDetailsComponent} from "./pages/product-details/product-details.component";
import {CartComponent} from "./pages/cart/cart.component";
import {CheckoutComponent} from "./pages/checkout/checkout.component";
import {AppLayoutComponent} from "./layout/app-layout/app-layout.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NewsletterFormComponent,
    SearchComponent,
    HomeComponent,
    ShopComponent,
    ProductDetailsComponent,
    CartComponent,
    CheckoutComponent,
    AppLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    // AuthService,
    // { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    // JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
