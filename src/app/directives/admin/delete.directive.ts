import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DeleteDialogComponent } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { DeleteState } from 'src/app/Enums/DeleteState';
import { SpinnerType } from 'src/app/Enums/enums';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { JobService } from 'src/app/services/common/jobs/job.service';

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
    private toastrService:ToastrService,
  ) { }

  ngOnInit(): void {
    const img = this._renderer.createElement("img");
    this._renderer.setAttribute(img, "src", "/assets/icons/delete.png");
    this._renderer.setStyle(img, "cursor", "pointer");
    this._renderer.setAttribute(img, "width", "25");
    this._renderer.setAttribute(img, "height", "25");
    this._renderer.appendChild(this.element.nativeElement, img);
  }

  //gençay 22.DERS
  @Input() id: string; // silme işlemi için id parametresi, directive'in kullanıldığı component'ten input olarak alıyor
  @Input() controller: string
  @Output() callback: EventEmitter<any> = new EventEmitter(); // silme işlemi tamalandığında listeyi yenilemek için kullanılan output nesnesi

  @HostListener("click")
  onClick() {
    this.openDialog(async () => {
      this.spinnerService.show(SpinnerType.save)
      const td: HTMLTableCellElement = this.element.nativeElement
      this.httpClientService.Delete({
        controller: this.controller
      }, this.id).subscribe(data => {
        $(td.parentElement).fadeOut(300, () => {
          this.spinnerService.hide(SpinnerType.save)
          this.callback.emit()
          this.toastrService.success("Hizmet Silinmiştir","Başarılı")
        })
      },(errorResponse) =>{
        this.spinnerService.hide(SpinnerType.save)
        this.callback.emit()
        this.toastrService.error("Hizmet Silinemedi","Hata")
      })
    })
  }

  openDialog(afterClosed: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
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
