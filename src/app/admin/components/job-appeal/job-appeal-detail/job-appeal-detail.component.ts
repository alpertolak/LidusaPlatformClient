import { trigger, transition, style, animate } from '@angular/animations';
import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { User_Document } from 'src/app/contracts/users/user-document';
import { JobAppeal } from 'src/app/entities/JobAppeal';
import { SpinnerType } from 'src/app/Enums/enums';
import { JobAppealService } from 'src/app/services/common/models/job-appeal.service';
import { UserService } from 'src/app/services/common/models/user.service';

declare var $: any

@Component({
  selector: 'app-job-appeal-detail',
  templateUrl: './job-appeal-detail.component.html',
  styleUrl: './job-appeal-detail.component.css'
})

export class JobAppealDetailComponent implements AfterViewInit {

  @Input() JobAppealId: string;
  public jobAppeal: JobAppeal = new JobAppeal();
  public deleteButtonState: boolean = true
  public rejectionReason: string

  //user document
  public UserDocuments: User_Document[] = [];// kullanıcının yüklediği belgeler
  public UserDocumentsCount: number;
  showAll: boolean = false

  constructor(
    private _jobAppealService: JobAppealService,
    private _spinner: NgxSpinnerService,
    private _toastrService: ToastrService,
    private userService: UserService
  ) { }
  async getUserDocument() {
    var data: any = await this.userService.getUserDocuments(this.JobAppealId)
    this.UserDocuments = data.userDocuments
    this.UserDocumentsCount = this.UserDocuments.length

  }

  async setSeenToDb() {
    await this._jobAppealService.UpdateSeen(this.JobAppealId, true)
  }

  ngAfterViewInit(): void {
    var modal = document.getElementById("jobAppealDetailModal")

    if (modal) {
      modal.addEventListener('shown.bs.modal', () => {
        this.onModalOpen();
      })
      modal.addEventListener('hidden.bs.modal', () => {
        this.onModalClose()
      })
    }
  }

  onModalOpen() {
    this.updateDeleteButtonState("") // modal açılında sayaç sıfırlanır
    this.getJobAppealDetails(this.JobAppealId);
    this.getUserDocument()
    this.setSeenToDb()
  }

  onModalClose() {
    this.jobAppeal = new JobAppeal();
  }


  async getJobAppealDetails(appealId: string) {
    this._spinner.show(SpinnerType.load)
    var data: any = await this._jobAppealService.getJobAppealById(appealId, () => {
      this._spinner.hide(SpinnerType.load)
    })
    this.jobAppeal = data.jobAppeal
  }

  onApproved() {
    this._spinner.show(SpinnerType.save)
    this._jobAppealService.approveJobAppeal(this.jobAppeal.id, () => {
      this._spinner.hide(SpinnerType.save)
      this._toastrService.success("Başvuru onaylandı", "Başarılı")
    }, () => {
      this._spinner.hide(SpinnerType.save)
      this._toastrService.error("Onaylama başarısız", "Başarısız")
    })
  }

  onCancel() {
    this._spinner.show(SpinnerType.save)
    this._jobAppealService.rejectJobAppeal(this.jobAppeal.id, this.rejectionReason, () => {
      this._spinner.hide(SpinnerType.save)
      this._toastrService.success("Başvuru reddedildi", "Başarılı")
    }, () => {
      this._spinner.hide(SpinnerType.save)
      this._toastrService.error("reddetme başarısız", "Başarısız")
    })
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    const pad = (n: number) => n.toString().padStart(2, '0');

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  updateDeleteButtonState(rejectionReason: string) {
    this.rejectionReason = rejectionReason
    if (rejectionReason.length >= 15) this.deleteButtonState = false
    else this.deleteButtonState = true
  }

  get visibleFiles() {
    return this.showAll ? this.UserDocuments : this.UserDocuments.slice(0, 3);
  }

  toggleShowAll() {
    this.showAll = !this.showAll;
    this.getUserDocument()
  }
}
