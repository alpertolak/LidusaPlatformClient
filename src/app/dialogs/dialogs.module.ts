import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { FileUploadsDialogComponent } from './file-uploads-dialog/file-uploads-dialog.component';



@NgModule({
  declarations: [
    DeleteDialogComponent,
    FileUploadsDialogComponent,

  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    NgxFileDropModule
  ],
  exports:[
    DeleteDialogComponent,
    FileUploadsDialogComponent
  ]
})
export class DialogsModule { }
