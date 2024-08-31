import { MatDialogRef } from "@angular/material/dialog";

export class BaseDialog<T> {

    constructor(public dialogRef: MatDialogRef<T>) { }
    
    close(): void {
        this.dialogRef.close();
    }
}
