import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardModule } from './dashboard/dashboard.module';
import { JobsModule } from './jobs/jobs.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardModule,
    JobsModule
  ], 
  exports: [
    JobsModule
  ]
})
export class ComponentsModule { }
