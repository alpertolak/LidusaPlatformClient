import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SpinnerType } from 'src/app/Enums/enums';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { JobService } from 'src/app/services/common/jobs/job.service';
import { JobAppealService } from 'src/app/services/common/models/job-appeal.service';

@Component({
  selector: 'app-appeal-to-job',
  templateUrl: './appeal-to-job.component.html',
  styleUrl: './appeal-to-job.component.css'
})
export class AppealToJobComponent implements OnInit {

  //açıklama için Karakter sınırı
  DescriptionMaxLength: number = 150;

  //jobs için değişkenler
  jobs: any[] = [];// iş ilanları


  //address bilgileri için değişkenler
  Turkey_geo: any[] = [];
  districts: any[] = [];
  neighborhoods: any[] = [];
  selectedCity: any;
  selectedDistrict: any;

  //kullanıcı bilgileri için değişkenler
  AppealForm: FormGroup

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,
    private httpClient: HttpClientService,
    private jobService: JobService,
    private JobAppealService: JobAppealService) { }

  ngOnInit(): void {
    this.getJobs()
    this.createForm()
    this.loadTurkey_geo()
  }

  createForm() {
    this.AppealForm = this.formBuilder.group({
      appealJob: ['', Validators.required],
      city: ['', Validators.required],
      district: ['', Validators.required],
      neighborhood: ['', Validators.required],
      appealDescription: ['Merhaba, yukarıda belirtilen iş için ilan açma başvurunda bulunmak istiyorum.', [Validators.maxLength(this.DescriptionMaxLength)]],
    })
  }

  onFormSubmit() {
    if (this.AppealForm.valid) {
      this.spinner.show(SpinnerType.save)
      this.JobAppealService.createJobAppeal(this.AppealForm.value, () => {
        this.spinner.hide(SpinnerType.save)
        this.toastrService.success("Başvurunuz alınmıştır.", "Başvuru Başarılı", {
        })
      }, () => {
        this.spinner.hide(SpinnerType.save)
        this.toastrService.error("Başvuru alınamadı, daha sonra tekrar deneyiniz.", "Başvuru Başarısız", {
        })
      })
    }
  }

  async getJobs() {
    var jobs = await this.jobService.read(0, 9999)
    this.jobs = jobs.jobs
    console.log(this.jobs)
  }

  loadTurkey_geo(): void {
    this.httpClient.Get<any>({
      //assetlerden json dosyası çekilir
      fullEndPoint: "assets/common/jsons/turkey-geo.json"
    }).subscribe(data => {
      //gelen verilerden İl olanlar cities dizisine atanır
      data.forEach((dat: any) => {
        this.Turkey_geo.push(dat);
      });
      //console.log(this.Turkey_geo)
    });
  }

  loadDistricts(City: string): void {
    this.districts = this.Turkey_geo.find(geo => geo.City === City)?.Districts || [];
    //console.log(this.districts)
  }

  loadNeighborhoods(District: string): void {
    const selectedDistrict = this.districts.find(district => district.District === District);

    this.neighborhoods = [];// her seferinde array temizlenir

    selectedDistrict.Towns.forEach((district: any) => {
      this.neighborhoods.push(district.Neighborhoods);
    })
    this.neighborhoods = this.neighborhoods.flat();
    //console.log(this.neighborhoods)
  }

  onCityChange(event: any): void {
    var City = event[0].innerText
    this.AppealForm.get('district')?.setValue('');
    this.AppealForm.get('neighborhood')?.setValue('');

    if (this.selectedCity == City) return
    this.neighborhoods = [];// her seferinde array temizlenir
    this.loadDistricts(City);
    this.selectedCity = this.Turkey_geo.find(geo => geo.City === City);
  }

  onDistrictChange(event: any): void {
    var District = event[0].innerText;
    this.AppealForm.get('neighborhood')?.setValue('');
    if (this.selectedDistrict == District) return
    this.neighborhoods = [];// her seferinde array temizlenir
    this.loadNeighborhoods(District);
    this.selectedDistrict = this.districts.find(district => district.id === event.innerText);
  }

  get remainingChars(): number {
    const personalDescription = this.AppealForm.get('appealDescription')?.value;
    return this.DescriptionMaxLength - (personalDescription ? personalDescription.length : 0);
  }
}
