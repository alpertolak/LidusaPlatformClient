import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';
import { RegisterComponent } from './login/register/register.component';
import { LoginComponent } from './login/login/login.component';

const routes: Routes = [
  {
    //admin paneli için üst yönledirme
    path: "admin", component: LayoutComponent, children: [
      { path: "dashboard", loadChildren: () => import("././admin/components/dashboard/dashboard.module").then(module => module.DashboardModule) },
      { path: "jobs", loadChildren: () => import("././admin/components/jobs/jobs.module").then(module => module.JobsModule) }
    ],
  },{
    //ui paneli için üst yönledirme
    path: "", component: LayoutComponent, pathMatch: 'full'
  },{
    path:"register",component: RegisterComponent
  },{
    path:"login",component: LoginComponent
  },
  // Yanlış rotalar için varsayılan yönlendirme
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
