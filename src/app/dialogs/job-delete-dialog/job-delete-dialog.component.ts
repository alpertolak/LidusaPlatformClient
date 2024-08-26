import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-job-delete-dialog',
  templateUrl: './job-delete-dialog.component.html',
  styleUrls: ['./job-delete-dialog.component.css']
})
export class JobDeleteDialogComponent {

  readonly dialogRef = inject(MatDialogRef<JobDeleteDialogComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  

  Close(): void {
    this.dialogRef.close();
  }
}
