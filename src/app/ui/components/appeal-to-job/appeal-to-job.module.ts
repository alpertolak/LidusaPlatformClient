import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppealToJobComponent } from './appeal-to-job.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'src/app/services/common/file-upload/file-upload.module';
import { DialogsModule } from "../../../dialogs/dialogs.module";
import { DeleteDirective } from 'src/app/directives/admin/delete-directive/delete.directive';
import { DeleteDirectiveModule } from 'src/app/directives/admin/delete-directive/delete-directive.module';



@NgModule({
  declarations: [
    AppealToJobComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FileUploadModule,
    DialogsModule,
    DeleteDirectiveModule
]
})
export class AppealToJobModule { }
