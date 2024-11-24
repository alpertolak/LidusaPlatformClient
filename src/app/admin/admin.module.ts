import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './layout/layout.module'
import { ComponentsModule } from './components/components.module';
import { AdminRoutingModule } from './admin.module.routing';


@NgModule({
  declarations: [],
  imports: [
    ComponentsModule,
    CommonModule,
    LayoutModule,
    AdminRoutingModule
  ],
  exports:[
    LayoutModule
  ]
})
export class AdminModule { }
