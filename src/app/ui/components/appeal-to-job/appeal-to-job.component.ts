import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, Output } from '@angular/core';
import { getActiveConsumer } from '@angular/core/primitives/signals';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Update_Job_Appeal } from 'src/app/contracts/JobAppeal/update-jobAppeal';
import { User_Document } from 'src/app/contracts/users/user-document';
import { JobAppeal } from 'src/app/entities/JobAppeal';
import { SpinnerType } from 'src/app/Enums/enums';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { JobService } from 'src/app/services/common/jobs/job.service';
import { JobAppealService } from 'src/app/services/common/models/job-appeal.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-appeal-to-job',
  templateUrl: './appeal-to-job.component.html',
  styleUrl: './appeal-to-job.component.css',
  animations: [ // daha fazla yükle kısmı için animasyon
    trigger('fadeList', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(8px)' }),
        animate('250ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('250ms ease-in', style({ opacity: 0, transform: 'translateY(8px)' }))
      ])
    ])
  ]
})
export class AppealToJobComponent implements OnInit {

  //document için değişkenler
  showAll: boolean = false
  UserId: string = localStorage.getItem('UserId') as string // kullanıcının id'si

  //açıklama için Karakter sınırı
  DescriptionMaxLength: number = 150;

  //address bilgileri için değişkenler
  Turkey_geo: any[] = [];
  districts: any[] = [];
  neighborhoods: any[] = [];
  selectedCity: any;
  selectedDistrict: any;

  //kullanıcı bilgileri için değişkenler
  public AppealForm: FormGroup
  jobs: any[] = [];// iş ilanları
  public UserDocuments: User_Document[] = [];// kullanıcının yüklediği belgeler
  public UserDocumentsCount: number;
  public IsAppealOld: boolean = false

  @Output() fileUploadOptions: Partial<FileUploadOptions> = {
    action: "UploadUserDocument",
    controller: "users",
    accept: ".pdf", // izin verilen dosya formatları
    buttonName: "Evrak Seç",
    queryString: `userId=${this.UserId}`, // query string ile gönderilecek parametreler
    multiple: true,
    afterClose: () => {
      this.getUserDocument()
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,
    private httpClient: HttpClientService,
    private jobService: JobService,
    private JobAppealService: JobAppealService,
    private userService: UserService) { }

  async ngOnInit(): Promise<void> {
    await this.createForm()
    await this.loadTurkey_geo()
    await this.getUserJobAppeal()
    await this.getJobs()
    await this.getUserDocument()
  }

  async getUserDocument() {
    setTimeout(async () => {
      var data: any = await this.userService.getUserDocuments(this.UserId)
      this.UserDocuments = data.userDocuments
      this.UserDocumentsCount = this.UserDocuments.length
    }, 150);
  }

  async deleteAllDocument() {
    this.spinner.show(SpinnerType.save)
    await this.userService.DeleteAllUserDocumentsById(this.UserId, () => {
      this.spinner.hide(SpinnerType.save)
      setTimeout(() => {
        this.getUserDocument()
      }, 200); // dosyaların ekrandan silinme süresi
      this.toastrService.success("bütün evraklar silinmiştir", "Başarılı")
    }, () => {
      this.spinner.hide(SpinnerType.save)
      this.toastrService.error("Lüfen daha sonra tekrar deneyiniz", "Hata")
    })
  }

  async equalizeAddress(City: string, District: string) {
    this.selectedCity = City;
    this.selectedDistrict = District;
    this.loadDistricts(this.selectedCity);
    this.loadNeighborhoods(this.selectedDistrict);
  }

  async createForm() {
    this.AppealForm = this.formBuilder.group({
      appealJob: ['', Validators.required],
      appealUserCity: ['', Validators.required],
      appealUserDistrict: ['', Validators.required],
      appealUserNeighborhood: ['', Validators.required],
      appealDescription: ['Merhaba, belirtilen iş için ilan açma başvurunda bulunmak istiyorum.', [Validators.maxLength(this.DescriptionMaxLength)]],
    })
    // appealUserCity: string
    // appealUserDistrict: string
    // appealUserNeighborhood: string
    // appealDescription: string
  }

  onFormSubmit() {
    debugger
    if (this.AppealForm.valid) {
      this.spinner.show(SpinnerType.save)
      if (this.IsAppealOld) {

        //form bilgileri update_job_appeal olarak eşitleniyor
        const update_appeal = new Update_Job_Appeal
        update_appeal.Id = this.UserId
        update_appeal.appealJob = this.AppealForm.get('appealJob')?.value
        update_appeal.appealDescription = this.AppealForm.get('appealDescription')?.value
        update_appeal.appealUserCity = this.AppealForm.get('appealUserCity')?.value
        update_appeal.appealUserDistrict = this.AppealForm.get('appealUserDistrict')?.value
        update_appeal.appealUserNeighborhood = this.AppealForm.get('appealUserNeighborhood')?.value

        this.JobAppealService.UpdateJobAppeal(update_appeal, () => {
          this.spinner.hide(SpinnerType.save)
          this.toastrService.success("Başvurunuz güncellenmiştir", "Başvuru Başarılı")
          this.router.navigate(['/profile'])
        }, () => {
          this.spinner.hide(SpinnerType.save)
          this.toastrService.error("başvuru güncelleme İşlemi yapılamadı", "Başvuru Başarısız")
        })
      }
      else {
        this.JobAppealService.createJobAppeal(this.AppealForm.value, () => {
          this.spinner.hide(SpinnerType.save)
          this.toastrService.success("Başvurunuz alınmıştır", "Başvuru Başarılı")
          this.router.navigate(['/profile'])
        }, () => {
          this.spinner.hide(SpinnerType.save)
          this.toastrService.error("Başvuru alınamadı, daha sonra tekrar deneyiniz", "Başvuru Başarısız")
        })
      }
    }
  }

  async getUserJobAppeal() {
    var data = await this.JobAppealService.GetCurrentUserJobAppeal()
    if (data.currentUserJobAppeal.appealJob) {
      this.IsAppealOld = true
      this.AppealForm.patchValue({
        appealJob: data.currentUserJobAppeal.appealJob,
        appealUserCity: data.currentUserJobAppeal.appealUserCity,
        appealUserDistrict: data.currentUserJobAppeal.appealUserDistrict,
        appealUserNeighborhood: data.currentUserJobAppeal.appealUserNeighborhood,
        appealDescription: data.currentUserJobAppeal.appealDescription
      })
    }

  }
  async getJobs() {
    var jobs = await this.jobService.read(0, 9999)
    this.jobs = jobs.jobs
  }

  async loadTurkey_geo() {
    this.httpClient.Get<any>({
      //assetlerden json dosyası çekilir
      fullEndPoint: "assets/common/jsons/turkey-geo.json"
    }).subscribe(data => {
      //gelen verilerden İl olanlar cities dizisine atanır
      data.forEach(async (dat: any) => {
        this.Turkey_geo.push(dat);
      });
      //console.log(this.Turkey_geo)

      //kullanıcının adress bilgisi varsa eşitleniyor
      //adres bilgileri yüklenmesi için 50ms bekletilir
      setTimeout(async () => {
        if (this.AppealForm.get('appealUserCity')?.value && this.AppealForm.get('appealUserDistrict')?.value) {
          this.equalizeAddress(this.AppealForm.get('appealUserCity')?.value, this.AppealForm.get('appealUserDistrict')?.value)
        }
      }, 150)
    })

  }

  async loadDistricts(City: string) {
    this.districts = this.Turkey_geo.find(geo => geo.City === City)?.Districts || [];
    //console.log(this.districts)
  }

  async loadNeighborhoods(District: string) {
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
    this.AppealForm.get('appealUserDistrict')?.setValue('');
    this.AppealForm.get('appealUserNeighborhood')?.setValue('');

    if (this.selectedCity == City) return
    this.neighborhoods = [];// her seferinde array temizlenir
    this.loadDistricts(City);
    this.selectedCity = this.Turkey_geo.find(geo => geo.City === City);
  }

  onDistrictChange(event: any): void {
    var District = event[0].innerText;
    this.AppealForm.get('appealUserNeighborhood')?.setValue('');
    if (this.selectedDistrict == District) return
    this.neighborhoods = [];// her seferinde array temizlenir
    this.loadNeighborhoods(District);
    this.selectedDistrict = this.districts.find(district => district.id === event.innerText);
  }

  get remainingChars(): number {
    const personalDescription = this.AppealForm.get('appealDescription')?.value;
    return this.DescriptionMaxLength - (personalDescription ? personalDescription.length : 0);
  }

  get visibleFiles() {
    return this.showAll ? this.UserDocuments : this.UserDocuments.slice(0, 3);
  }

  toggleShowAll() {
    this.showAll = !this.showAll;
  }
}
