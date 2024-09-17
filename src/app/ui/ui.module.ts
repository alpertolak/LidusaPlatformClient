import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { ULayoutModule } from './Ulayout/ulayout.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ULayoutModule
  ]
})
export class UiModule { }
