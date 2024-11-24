import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { ULayoutModule } from './Ulayout/ulayout.module';
import { UiRoutingModule } from './ui.module.routing';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ComponentsModule,
    ULayoutModule,
    UiRoutingModule
  ]
})
export class UiModule { }
