import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { PasswordUpdateComponent } from './password-update/password-update.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'password-reset', component: PasswordResetComponent }, // localhost:4200/password-reset
  { path: 'password-update/:userId/:resetToken', component: PasswordUpdateComponent } //localhost:4200/password-reset//password-update
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
