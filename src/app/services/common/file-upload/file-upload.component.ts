import { Component, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {

  //GENÇAY 25.DERS
  constructor(
    private httClientService: HttpClientService,
    private toastrService: ToastrService) { }

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

    this.httClientService.Post({
      controller: this.options.controller,
      action: this.options.action,
      queryString: this.options.queryString,
      headers: new HttpHeaders({ "response-type": "blob" })
    }, fileData).subscribe(result => {
      this.toastrService.success("Dosyalar  yüklenmiştir","Başarılı")
    }, (ErrorReponse: HttpErrorResponse) => {
      this.toastrService.error(ErrorReponse.error,"Dosya yükleme başarısız")

    })
  }
}

export class FileUploadOptions {
  controller?: string //istek yapılacak controller bilgisi
  action?: string 
  queryString?: string
  explanation?: string //kullanılan sayfaya özel metin içeriği
  accept?: string //kullanılan sayfaya özel kabul edilecek türleri
}