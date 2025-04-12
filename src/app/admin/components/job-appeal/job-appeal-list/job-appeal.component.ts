import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { List_JobAppeals } from 'src/app/contracts/JobAppeal/list-jobAppeals';
import { ListPaginationJobAppeals } from 'src/app/contracts/JobAppeal/list-pagination-JobAppeals';
import { SpinnerType } from 'src/app/Enums/enums';
import { JobAppealService } from 'src/app/services/common/models/job-appeal.service';

@Component({
  selector: 'app-job-appeal',
  templateUrl: './job-appeal.component.html',
  styleUrl: './job-appeal.component.css'
})
export class JobAppealComponent implements OnInit, AfterViewInit {

  constructor(
    private _jobAppealService: JobAppealService,
    private _spinner: NgxSpinnerService,
    private _toastrService: ToastrService,
  ) { }

  public AppealDetailId: string;

  displayedColumns: string[] = ['Kullanıcı Adı', 'hizmet', 'Başvuru Tarihi', 'Başvuru Durumu', 'edit']
  dataSource: MatTableDataSource<List_JobAppeals>
  @ViewChild(MatPaginator) paginator: MatPaginator

  ngOnInit(): void {
    this.getAllJobAppeals()
  }

  ngAfterViewInit() {
    const modalEl = document.getElementById('jobAppealDetailModal');
    if (modalEl) {
      modalEl.addEventListener('hidden.bs.modal', () => {
        this.getAllJobAppeals(); // 🔄 Modal kapandı → tabloyu güncelle
      });
    }
  }
  
  async getAllJobAppeals() {
    debugger
    this._spinner.show(SpinnerType.load)
    const ListPaginationJobAppeals: ListPaginationJobAppeals = await this._jobAppealService.getAllJobAppeals(
      this.paginator ? this.paginator.pageIndex : 0,
      this.paginator ? this.paginator.pageSize : 5,
      () => { this._spinner.hide(SpinnerType.load) },
      () => {
        this._spinner.hide(SpinnerType.load)
        this._toastrService.error("Başvuru listesi alınamadı", "Başvuru Listesi")
      }
    )
    this.setUsersToTable(ListPaginationJobAppeals)
  }

  setUsersToTable(appeals: ListPaginationJobAppeals) {
    this.dataSource = new MatTableDataSource<List_JobAppeals>(appeals.jobAppeals)
    this.paginator.length = appeals.totalJobAppealsCount
  }

  async pageChanged() {
    await this.getAllJobAppeals()
  }

}
