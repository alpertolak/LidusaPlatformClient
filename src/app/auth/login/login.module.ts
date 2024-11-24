import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    //LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class LoginModule { }
