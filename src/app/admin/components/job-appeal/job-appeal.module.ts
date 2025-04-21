import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobAppealComponent } from './job-appeal-list/job-appeal.component';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { JobAppealDetailComponent } from './job-appeal-detail/job-appeal-detail.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    JobAppealComponent,
    JobAppealDetailComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule
  ]
})
export class JobAppealModule { }
