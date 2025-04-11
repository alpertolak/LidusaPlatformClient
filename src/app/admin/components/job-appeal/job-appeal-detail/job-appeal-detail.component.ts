import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { JobAppeal } from 'src/app/entities/JobAppeal';
import { SpinnerType } from 'src/app/Enums/enums';
import { JobAppealService } from 'src/app/services/common/models/job-appeal.service';

declare var $: any

@Component({
  selector: 'app-job-appeal-detail',
  templateUrl: './job-appeal-detail.component.html',
  styleUrl: './job-appeal-detail.component.css'
})

export class JobAppealDetailComponent implements AfterViewInit {

  @Input() JobAppealId: string;
  public jobAppeal: JobAppeal = new JobAppeal();


  constructor(
    private _jobAppealService: JobAppealService,
    private _spinner: NgxSpinnerService,
    private _toastrService: ToastrService,
  ) { }

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
    this.getJobAppealDetails(this.JobAppealId);
  }

  onModalClose() {
    this.jobAppeal = new JobAppeal();
  }


  async getJobAppealDetails(appealId: string) {
    var data: any = await this._jobAppealService.getJobAppealById(appealId)
    this.jobAppeal = data.jobAppeal
  }

  onApproved() {
    this._spinner.show(SpinnerType.save)
    this._jobAppealService.approveJobAppeal("this.jobAppeal.id", () => {
      this._spinner.hide(SpinnerType.save)
      this._toastrService.success("Başvuru onaylandı", "Başarılı")
    }, () => {
      this._spinner.hide(SpinnerType.save)
      this._toastrService.error("Onaylama başarısız", "Başarısız")
    })


  }
  onCancel() {
    this._spinner.show(SpinnerType.save)
    this._jobAppealService.rejectJobAppeal(this.jobAppeal.id, () => {
      this._spinner.hide(SpinnerType.save)
      this._toastrService.success("Başvuru reddedildi", "Başarılı")
    }, () => {
      this._spinner.hide(SpinnerType.save)
      this._toastrService.error("reddetme başarısız", "Başarısız")
    })
  }
}
