import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { LayoutComponent } from './layout/layout.component';
import { RolesComponent } from './components/roles/roles.component';
import { AuthorizeMenuComponent } from './components/authorize-menu/authorize-menu.component';
import { AuthGuard } from '../guards/common/auth.guard';

const routes: Routes = [
  {
    path: 'admin', component: LayoutComponent, // "admin" path'i yüklendiğinde aşağıdaki children path'ler yüklenir
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UsersComponent },
      { path: 'jobs', component: JobsComponent },
      { path: 'roles', component: RolesComponent },
      { path: 'authorize-menu', component: AuthorizeMenuComponent }
    ], canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Child yönlendirme
  exports: [RouterModule]
})
export class AdminRoutingModule { }
