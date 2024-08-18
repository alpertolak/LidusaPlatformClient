import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { _MatTableDataSource, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { List_Job } from 'src/app/contracts/jobs/list-jobs';
import { ListJobsPagination } from 'src/app/contracts/jobs/list-pagination';
import { SpinnerType } from 'src/app/Enums/enums';
import { JobService } from 'src/app/services/common/jobs/job.service';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
})
export class JobsListComponent implements OnInit {

  constructor(
    private jobService: JobService,
    private spinner: NgxSpinnerService
  ) { }

  displayedColumns: string[] = ['Hizmet'];
  dataSource: MatTableDataSource<List_Job>
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getJobs() {
    this.spinner.show(SpinnerType.load)
    const allJobs: ListJobsPagination = await this.jobService.read(
      this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5,
      () => { //successCallBack
        this.spinner.hide(SpinnerType.load)
      }, () => { //errorCallBack
        this.spinner.hide(SpinnerType.load)
      })

    this.dataSource = new MatTableDataSource<List_Job>(allJobs.jobs)
    this.paginator.length = allJobs.totalCount
  }
  async pageChanged() {
    await this.getJobs()
  }
  async ngOnInit() {
    await this.getJobs()
  }

}