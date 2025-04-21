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
    this._renderer.setAttribute(img, "src", this.DeleteButtonType == "1" ? "/assets/icons/delete.png" : this.DeleteButtonType == "2" ? "/assets/icons/cross.png" : "");
    this._renderer.setStyle(img, "cursor", "pointer");
    this._renderer.setAttribute(img, "width", this.IconWidth);
    this._renderer.setAttribute(img, "height", this.IconHeight);
    this._renderer.appendChild(this.element.nativeElement, img);
  }

  //gençay 22.DERS - 23.DERS
  @Input() id: string; // silme işlemi için id parametresi, directive'in kullanıldığı component'ten input olarak alıyor
  @Input() controller: string //delete directive'i evrensel olark tanımlayabilmek için kullanıldığı yerde istek yappılacak controller bilgisni alıyoruz
  @Input() action: string
  @Input() IsOpenDialog: boolean = true
  @Input() ShowInfo: boolean = true
  @Input() DeleteButtonType: string = "1";
  @Input() IconHeight: string = "25"
  @Input() IconWidth: string = "25"
  @Output() callback: EventEmitter<any> = new EventEmitter(); // silme işlemi tamalandığında listeyi yenilemek için kullanılan output nesnesi

  @HostListener("click")
  onClick() {
    if (this.IsOpenDialog) {
      this.dialogService.openDialog({
        componentType: DeleteDialogComponent,
        data: DialogState.yes,
        options: { width: "350px" },
        afterClose: () => {
          this.deleteItem()
        }
      })
    }
    else {
      this.deleteItem()
    }

  }
  deleteItem() {
    this.spinnerService.show(SpinnerType.save)
    const td: HTMLTableCellElement = this.element.nativeElement
    this.httpClientService.Delete({
      controller: this.controller,
      action: this.action
    }, this.id).subscribe(data => {
      $(td.parentElement).fadeOut(300, () => {
        this.spinnerService.hide(SpinnerType.save)
        this.callback.emit()
        if (this.ShowInfo) this.toastrService.success("Sile işlemi başarılı", "Başarılı")
      })
    }, (errorResponse) => {
      this.spinnerService.hide(SpinnerType.save)
      this.callback.emit()
      if (this.ShowInfo) this.toastrService.error("Sile işlemi Başarısız", "Hata")
    })
  }
}
