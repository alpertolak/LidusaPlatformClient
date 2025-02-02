import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ULayoutComponent } from './ulayout.component';
import { RouterModule } from '@angular/router';
import { UheaderComponent } from './component/uheader/uheader.component';
import { UfooterComponent } from './component/ufooter/ufooter.component';
import { HomeComponent } from "../components/home/home.component";
import { LayoutModule } from 'src/app/admin/layout/layout.module';



@NgModule({
  declarations: [
    ULayoutComponent,
    UheaderComponent,
    UfooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    LayoutModule
  ]
})
export class ULayoutModule { }
