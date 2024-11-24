import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./ui/ui.module').then(module => module.UiModule) }, // Lazy-loaded UiModule
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(module => module.AdminModule) }, // Lazy-loaded AdminModule
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },  // AuthModule lazy load ediliyor
  { path: '**', component: PageNotFoundComponent } // Yanlış rotalar için varsayılan yönlendirme
  // {
  //   //admin paneli için üst yönledirme
  //   path: "admin", component: LayoutComponent, children: [
  //     { path: "", loadChildren: () => import("./admin/components/dashboard/dashboard.module").then(module => module.DashboardModule) },
  //     { path: "jobs", loadChildren: () => import("./admin/components/jobs/jobs.module").then(module => module.JobsModule) },
  //     { path: "authorize-menu", loadChildren: () => import("./admin/components/authorize-menu/authorize-menu.module").then(module => module.AuthorizeMenuModule), },
  //     { path: "roles", loadChildren: () => import("./admin/components/roles/roles.module").then(module => module.RolesModule) },
  //     { path: "users", loadChildren: () => import("./admin/components/users/users.module").then(module => module.UsersModule) },

  //   ], canActivate: [AuthGuard]
  // },

  // { path: '', component: ULayoutComponent }, //ui paneli için üst yönledirme
  // { path: "register", loadChildren: () => import("./login/register/register.module").then(module => module.RegisterModule) },
  // { path: "login", loadChildren: () => import("./login/login/login.module").then(module => module.LoginModule) },
  // { path: "password-reset", loadChildren: () => import("./login/password-reset/password-reset.module").then(module => module.PasswordResetModule) },
  // { path: "password-update/:userId/:resetToken", loadChildren: () => import("./login/password-update/password-update.module").then(module => module.PasswordUpdateModule) },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
