import { Component, Inject } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogState } from 'src/app/Enums/enums';

@Component({
  selector: 'app-file-uploads-dialog',
  templateUrl: './file-uploads-dialog.component.html',
  styleUrls: ['./file-uploads-dialog.component.css']
})
export class FileUploadsDialogComponent extends BaseDialog<FileUploadsDialogComponent> {

  constructor(dialogRef: MatDialogRef<FileUploadsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogState
  ) {
    super(dialogRef)
  }
}
