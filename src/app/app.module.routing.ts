import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./ui/ui.module').then(module => module.UiModule) }, // Lazy-loaded UiModule
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(module => module.AdminModule) }, // Lazy-loaded AdminModule
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },  // AuthModule lazy load ediliyor
  { path: '**', component: PageNotFoundComponent } // Yanlış rotalar için varsayılan yönlendirme
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
