import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Advert } from 'src/app/entities/Advert';
import { JobService } from 'src/app/services/common/models/job.service';
import { AdvertService } from 'src/app/services/common/models/advert.service';

@Component({
  selector: 'app-adverts',
  templateUrl: './adverts.component.html',
  styleUrl: './adverts.component.css'
})
export class AdvertsComponent implements OnInit {

  public adverts: Advert[] = [];

  constructor(
    private advertService: AdvertService,
    private jobService: JobService
  ) { }

  jobForm = new FormControl<string[]>([]); jobList: string[] = [];
  nameForm = new FormControl('');
  genderForm = new FormControl<string[]>([]); genderList: string[] = ['Erkek', 'Kadın'];
  cityForm = new FormControl('');
  districtForm = new FormControl('');

  ngOnInit(): void {
    this.loadAdverts();
    this.getJobs();
  }

  async getJobs() {
    var jobs: any = await this.jobService.read(-1, -1)
    this.jobList = jobs.jobs.map((job: any) => job.jobName);
  }
  async loadAdverts() {
    var adverts: any = await this.advertService.getAllAdverts(true, false)
    this.adverts = adverts.allAdverts;
    console.log(this.adverts);
  }

  async filterAdverts() {
    var jobs: string[] = this.jobForm.value as string[];
    var genders: string[] = this.genderForm.value as string[];
    var data: any = await this.advertService.filterAdverts(jobs, this.nameForm.value as string, genders, this.cityForm.value as string, this.districtForm.value as string);
    this.adverts = data.filteredAdverts;
  }
  clearFilters() {
    this.jobForm.reset();
    this.nameForm.reset();
    this.cityForm.reset();
    this.districtForm.reset();
    this.genderForm.reset();
    this.loadAdverts();
  }
}
