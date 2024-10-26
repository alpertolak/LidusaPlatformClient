import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardModule } from './dashboard/dashboard.module';
import { JobsModule } from './jobs/jobs.module';
import { AuthorizeMenuModule } from './authorize-menu/authorize-menu.module';
import { RolesModule } from './roles/roles.module';
import { DeleteDirective } from 'src/app/directives/admin/delete-directive/delete.directive';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardModule,
    JobsModule,
    AuthorizeMenuModule,
    RolesModule,
  ], 
  exports: [
    JobsModule,
  ]
})
export class ComponentsModule { }
