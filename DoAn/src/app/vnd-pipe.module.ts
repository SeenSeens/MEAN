import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {VndPipe} from "./vnd.pipe";



@NgModule({
  declarations: [VndPipe],
  imports: [
    CommonModule
  ],
  exports: [VndPipe]
})
export class VndPipeModule {
  static forRoot() {
    return {
      ngModule: VndPipeModule,
      providers: [],
    };
  }
}
