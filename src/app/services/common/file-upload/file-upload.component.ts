import { Component, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadsDialogComponent } from 'src/app/dialogs/file-uploads-dialog/file-uploads-dialog.component';
import { DeleteState } from 'src/app/Enums/DeleteState';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {

  //GENÇAY 25.DERS
  constructor(
    private httClientService: HttpClientService,
    private toastrService: ToastrService,
    private dialog: MatDialog) { }

  public files: NgxFileDropEntry[];
  @Input() options: Partial<FileUploadOptions>

  public SelectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData()
    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath)
      })
    }

    this.openDialog(() => {
      this.httClientService.Post({
        controller: this.options.controller,
        action: this.options.action,
        queryString: this.options.queryString,
        headers: new HttpHeaders({ "response-type": "blob" })
      }, fileData).subscribe(result => {
        this.toastrService.success("Dosyalar  yüklenmiştir", "Başarılı")
      }, (ErrorReponse: HttpErrorResponse) => {
        this.toastrService.error(ErrorReponse.error, "Dosya yükleme başarısız")

      })
    })

  }
  openDialog(afterClosed: any): void {
    const dialogRef = this.dialog.open(FileUploadsDialogComponent, {
      width: "300px",
      data: DeleteState.yes
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == DeleteState.yes) {
        afterClosed()
      }
    });
  }

}

export class FileUploadOptions {
  controller?: string //istek yapılacak controller bilgisi
  action?: string
  queryString?: string
  explanation?: string //kullanılan sayfaya özel metin içeriği
  accept?: string //kullanılan sayfaya özel kabul edilecek türleri
}