import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DeleteDialogComponent } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { DialogState, SpinnerType } from 'src/app/Enums/enums';
import { DialogOptions, DialogService } from 'src/app/services/common/dialog.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';

declare var $: any

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective implements OnInit {

  constructor(
    private element: ElementRef,
    private _renderer: Renderer2,
    private httpClientService: HttpClientService,
    private spinnerService: NgxSpinnerService,
    public dialog: MatDialog,
    private toastrService: ToastrService,
    private dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    const img = this._renderer.createElement("img");
    this._renderer.setAttribute(img, "src", "/assets/icons/delete.png");
    this._renderer.setStyle(img, "cursor", "pointer");
    this._renderer.setAttribute(img, "width", "25");
    this._renderer.setAttribute(img, "height", "25");
    this._renderer.appendChild(this.element.nativeElement, img);
  }

  //gençay 22.DERS - 23.DERS
  @Input() id: string; // silme işlemi için id parametresi, directive'in kullanıldığı component'ten input olarak alıyor
  @Input() controller: string //delete directive'i evrensel olark tanımlayabilmek için kullanıldığı yerde istek yappılacak controller bilgisni alıyoruz
  @Output() callback: EventEmitter<any> = new EventEmitter(); // silme işlemi tamalandığında listeyi yenilemek için kullanılan output nesnesi

  @HostListener("click")
  onClick() {
    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DialogState.yes,
      options:{width:"350px"},
      afterClose: () => {
        this.spinnerService.show(SpinnerType.save)
        const td: HTMLTableCellElement = this.element.nativeElement
        this.httpClientService.Delete({
          controller: this.controller
        }, this.id).subscribe(data => {
          $(td.parentElement).fadeOut(300, () => {
            this.spinnerService.hide(SpinnerType.save)
            this.callback.emit()
            this.toastrService.success("Hizmet Silinmiştir", "Başarılı")
          })
        }, (errorResponse) => {
          this.spinnerService.hide(SpinnerType.save)
          this.callback.emit()
          this.toastrService.error("Hizmet Silinemedi", "Hata")
        })
      }
    })
  }
}
