import {  ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Create_Job } from 'src/app/contracts/jobs/create-Job';
import { JobService } from 'src/app/services/common/jobs/job.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/Enums/enums';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-jobs-create',
  templateUrl: './jobs-create.component.html',
  styleUrls: ['./jobs-create.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class JobsCreateComponent {

  constructor(
    private jobService: JobService,
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService) { }

  @Output() createdJobs: EventEmitter<Create_Job> = new EventEmitter()


  CreateJob(jobName: string, jobDescription: string) {
    
    //yeni job bilgileri form üzerinden alınıyor
    const newJob: Create_Job = new Create_Job()
    newJob.JobName = jobName
    newJob.JobDescription = jobDescription
    
    this.spinner.show(SpinnerType.save)
    this.jobService.createJob(newJob, () => {
      this.spinner.hide(SpinnerType.save)
      this.toastrService.success("Hizmet Başarıyla kaydedilmiştir.", "Başarılı")
      this.createdJobs.emit(newJob)
    }, errorMessage => {
      this.spinner.hide(SpinnerType.save)
      console.log(errorMessage.toString())
      this.toastrService.error(errorMessage.toString(), "Hata")
    })
  }
}