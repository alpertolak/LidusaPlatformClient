import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';

const routes: Routes = [
  {
    //admin paneli için üst yönledirme
    path: "admin", component: LayoutComponent, children: [
      { path: "dashboard", loadChildren: () => import("././admin/components/dashboard/dashboard.module").then(module => module.DashboardModule) },
      { path: "jobs", loadChildren: () => import("././admin/components/jobs/jobs.module").then(module => module.JobsModule) }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
