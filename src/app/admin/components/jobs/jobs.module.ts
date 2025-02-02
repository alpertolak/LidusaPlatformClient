import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsComponent } from './jobs.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { JobsCreateComponent } from './jobs-create/jobs-create.component';
import { RouterModule } from '@angular/router';
import { DeleteDirective } from 'src/app/directives/admin/delete-directive/delete.directive';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FileUploadModule } from 'src/app/services/common/file-upload/file-upload.module';
import { DialogsModule } from 'src/app/dialogs/dialogs.module';
import { DeleteDirectiveModule } from 'src/app/directives/admin/delete-directive/delete-directive.module';



@NgModule({
  declarations: [
    JobsComponent,
    JobsListComponent,
    JobsCreateComponent,
  ],
  imports: [
    DialogsModule,
    FileUploadModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    DeleteDirectiveModule,
  ]
})
export class JobsModule { }
