import { NgModule } from '@angular/core';
import {BrowserModule, provideClientHydration} from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule, provideHttpClient, withFetch} from "@angular/common/http";
import { NgxPaginationModule } from "ngx-pagination";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EditorModule} from "@tinymce/tinymce-angular";
import {AuthService} from "./services/auth.service";
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    EditorModule,
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    AuthService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
