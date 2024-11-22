import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';
import { RegisterComponent } from './login/register/register.component';
import { LoginComponent } from './login/login/login.component';
import { AuthGuard } from './guards/common/auth.guard';
import { PasswordResetComponent } from './login/password-reset/password-reset.component';
import { PasswordUpdateComponent } from './login/password-update/password-update.component';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    //admin paneli için üst yönledirme
    path: "admin", component: LayoutComponent, children: [
      { path: "dashboard", loadChildren: () => import("././admin/components/dashboard/dashboard.module").then(module => module.DashboardModule), canActivate: [AuthGuard] },
      { path: "jobs", loadChildren: () => import("././admin/components/jobs/jobs.module").then(module => module.JobsModule), canActivate: [AuthGuard] },
      { path: "authorize-menu", loadChildren: () => import("././admin/components/authorize-menu/authorize-menu.module").then(module => module.AuthorizeMenuModule), canActivate: [AuthGuard] },
      { path: "roles", loadChildren: () => import("././admin/components/roles/roles.module").then(module => module.RolesModule), canActivate: [AuthGuard] },
      { path: "users", loadChildren: () => import("././admin/components/users/users.module").then(module => module.UsersModule), canActivate: [AuthGuard] },


    ], canActivate: [AuthGuard]
  }, {
    //ui paneli için üst yönledirme
    path: "", component: LayoutComponent, pathMatch: 'full'
  }, {
    path: "register", component: RegisterComponent
  }, {
    path: "login", component: LoginComponent
  }, {
    path: "password-reset", component: PasswordResetComponent
  }, {
    path: "password-update/:userId/:resetToken", component: PasswordUpdateComponent
  },
  // Yanlış rotalar için varsayılan yönlendirme
  //{ path: '**', redirectTo: '', pathMatch: 'full' }
  { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
