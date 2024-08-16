import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';

const routes: Routes = [
  { path: "admin", component:  LayoutComponent},
  { path: '', redirectTo: '/admin', pathMatch: 'full' }, // Opsiyonel: Uygulamayı admin modülüne yönlendirmek için
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
