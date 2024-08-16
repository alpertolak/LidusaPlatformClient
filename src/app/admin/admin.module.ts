import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { LayoutModule } from './layout/layout.module';

export const adminRoutes: Routes = [
  //{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'jobs', component: JobsComponent }
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    LayoutModule,
    RouterModule.forChild(adminRoutes)

  ],
  exports:[
    LayoutModule
  ]
})
export class AdminModule { }
