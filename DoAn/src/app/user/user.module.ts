import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatPaginatorModule} from "@angular/material/paginator";
import {provideHttpClient, withFetch} from "@angular/common/http";
import {provideClientHydration} from "@angular/platform-browser";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
  ],
})
export class UserModule { }
