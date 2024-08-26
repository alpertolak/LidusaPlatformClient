import { Component, ViewChild } from "@angular/core";
import { Create_Job } from "src/app/contracts/jobs/create-Job";
import { JobsListComponent } from "./jobs-list/jobs-list.component";

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],

})
export class JobsComponent {


  @ViewChild(JobsListComponent) jobListComponent: JobsListComponent

  createdJob(createdJob: Create_Job) {
    this.jobListComponent.getJobs()
  }
}