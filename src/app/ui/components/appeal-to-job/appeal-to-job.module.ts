import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppealToJobComponent } from './appeal-to-job.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppealToJobComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class AppealToJobModule { }
