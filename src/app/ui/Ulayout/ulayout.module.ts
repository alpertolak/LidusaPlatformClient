import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ULayoutComponent } from './ulayout.component';
import { RouterModule } from '@angular/router';
import { UheaderComponent } from './component/uheader/uheader.component';
import { UfooterComponent } from './component/ufooter/ufooter.component';



@NgModule({
  declarations: [
    ULayoutComponent,
    UheaderComponent,
    UfooterComponent
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", component: ULayoutComponent }
    ])
  ]
})
export class ULayoutModule { }
