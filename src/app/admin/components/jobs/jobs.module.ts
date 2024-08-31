import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsComponent } from './jobs.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { JobsCreateComponent } from './jobs-create/jobs-create.component';
import { RouterModule } from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';
import { DeleteDirective } from 'src/app/directives/admin/delete.directive';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { DeleteDialogComponent } from 'src/app/dialogs/delete-dialog/delete-dialog.component';



@NgModule({
  declarations: [
    JobsComponent,
    JobsListComponent,
    JobsCreateComponent,
    DeleteDirective,
    DeleteDialogComponent

  ],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    RouterModule.forChild([
      { path: "", component: JobsComponent }
    ])

  ]
})
export class JobsModule { }