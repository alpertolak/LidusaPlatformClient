import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ULayoutComponent } from './ulayout.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ULayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ULayoutModule { }