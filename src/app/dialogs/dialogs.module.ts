import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { FileUploadsDialogComponent } from './file-uploads-dialog/file-uploads-dialog.component';
import { MatListModule } from '@angular/material/list';
import { AuthorizeUserDialogComponent } from './authorize-user-dialog/authorize-user-dialog.component';
import { MatBadgeModule } from '@angular/material/badge';
import { AuthorizeMenuDialogComponent } from './authorize-menu-dialog/authorize-menu-dialog.component';


@NgModule({
  declarations: [
    DeleteDialogComponent,
    FileUploadsDialogComponent,
    AuthorizeUserDialogComponent,
    AuthorizeMenuDialogComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    NgxFileDropModule,
    MatListModule,
    MatBadgeModule
  ],
  exports:[
    DeleteDialogComponent,
    FileUploadsDialogComponent
  ]
})
export class DialogsModule { }
