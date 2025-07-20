import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { User_Document } from 'src/app/contracts/users/user-document';
import { User_Profile_Image } from 'src/app/contracts/users/user-profile-image';
import { JobAppeal } from 'src/app/entities/JobAppeal';
import { User } from 'src/app/entities/User';
import { SpinnerType } from 'src/app/Enums/enums';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { JobAppealService } from 'src/app/services/common/models/job-appeal.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  //address bilgileri için değişkenler
  Turkey_geo: any[] = [];
  districts: any[] = [];
  neighborhoods: any[] = [];
  selectedCity: any;
  selectedDistrict: any;


  DescriptionMaxLength: number = 1200; //açıklama için Karakter sınırı

  //document için değişkenler
  showAll: boolean = false
  public UserDocuments: User_Document[] = [];// kullanıcının yüklediği belgeler
  public UserDocumentsCount: number;


  //HTML bölümünde form nesnesine ulaşabilmek için get fonsksiyonu
  defaultProfileImage: string = "../../../../assets/common/profile.jpg"
  profileForm: FormGroup //profil formu
  changePasswordForm: FormGroup //şifre değiştirme formu
  isChangePassword: boolean = false
  userImagePath: string = this.defaultProfileImage
  userId: string = localStorage.getItem('UserId') as string
  userRoles: string[] = []
  public isHasJob: boolean = false // kullanıcı iş başvurusu yapmış mı kontrolü için değişken
  public jobAppealState: boolean | null = null
  public jobAppeal: JobAppeal
  public jobAppealInfoClass: string
  public messageClasess: stateCssClasses
  public ShowSuccessSpan: boolean = false

  //kullanıcıya göre bazı bölgeler açılıp kapatılması için değişkenler
  public secretSectionsClass: string = "hide"
  public leftSideClasses: string = "left-side hide"
  public rightSideClasses: string = "right-side-IfGuest"
  public appealButton: string = "hide"

  //GENÇAY 25.DERS
  @Output() fileUploadOptions: Partial<FileUploadOptions> = {
    action: "Upload-User-Profile-Image",
    controller: "users",
    accept: ".png, .jpg",
    buttonName: "Resim seç",
    queryString: `userId=${this.userId}`,
    multiple: false
  }

  constructor(
    private jobAppealService: JobAppealService,
    private userService: UserService,
    private toastrService: ToastrService,
    private spinnerService: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private httpClient: HttpClientService) { }

  async ngOnInit() {
    await this.createForm()
    await this.getUser()
    await this.loadTurkey_geo()
    await this.getUserDocument()
  }

  async getUserJobAppeal(UserId: string) {
    var data: any = await this.jobAppealService.getJobAppealById(UserId)
    // console.log(data)
    if (data.jobAppeal.appealJob != null) {
      this.jobAppeal = data.jobAppeal
      this.jobAppealState = data.jobAppeal.appealState
      await this.setSpanVisibility(data.jobAppeal.appealState)
      this.updateMessageClasess()
    }
  }
  async createForm() {
    //Form nesnesi oluşturulur ve form elemanlarına başlangıç değerleri atanır
    this.profileForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      userName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      phoneNumber: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]],
      gender: ['', Validators.required],
      city: ['', Validators.required],
      district: ['', Validators.required],
      neighborhood: ['', Validators.required],
      twoFactorEnabled: [false],
      personalDescription: ['', [Validators.required, Validators.minLength(100), Validators.maxLength(this.DescriptionMaxLength)]],
      userJob: ['', [Validators.required]],
      instagramLink: ['', [Validators.pattern('https?://.+')]],
      instagramPerm: [true],
      facebookLink: ['', [Validators.pattern('https?://.+')]],
      facebookPerm: [true],
      twitterLink: ['', [Validators.pattern('https?://.+')]],
      twitterPerm: [true],
      linkedinLink: ['', [Validators.pattern('https?://.+')]],
      linkedinPerm: [true],
      youtubeLink: ['', [Validators.pattern('https?://.+')]],
      youtubePerm: [true],
      profileState: [true] // profil durumu, ilan aktif mi değil mi
    });
  }
  async getUser() {

    this.spinnerService.show(SpinnerType.load)
    var data: any = await this.userService.getCurrentUserAsync(() => {
    })
    // console.log(data)
    //apiden gelen data ile form elemanlarına değerler atanır
    this.profileForm.patchValue({
      id: data.user.id,
      name: data.user.name,
      userName: data.user.userName,
      lastName: data.user.lastName,
      email: data.user.email,
      phoneNumber: data.user.phoneNumber,
      personalDescription: data.user.personalDescription,
      twoFactorEnabled: data.user.twoFactorEnabled,
      city: data.user.city,
      district: data.user.district,
      neighborhood: data.user.neighborhood,
      userJob: data.user.userJob,
      gender: data.user.gender,
      instagramLink: data.user.instagramLink,
      instagramPerm: data.user.instagramPerm == null ? true : data.user.instagramPerm,
      facebookLink: data.user.facebookLink,
      facebookPerm: data.user.facebookPerm == null ? true : data.user.facebookPerm,
      twitterLink: data.user.twitterLink,
      twitterPerm: data.user.twitterPerm == null ? true : data.user.twitterPerm,
      linkedinLink: data.user.linkedinLink,
      linkedinPerm: data.user.linkedinPerm == null ? true : data.user.linkedinPerm,
      youtubeLink: data.user.youtubeLink,
      youtubePerm: data.user.youtubePerm == null ? true : data.user.youtubePerm,
      profileState: data.user.profileState,
    });
    this.spinnerService.hide(SpinnerType.load)

    // console.log(this.profileForm)

    //kullanıcının rolleri çekiliyor
    this.getUserRoles(data.user.id)

    this.getUserprofileImage(data.user.id)


    //kullanıcının iş başvurusu var mı kontrol ediliyor
    this.getUserJobAppeal(data.user.id)
  }

  async getUserRoles(userId: string) {
    this.userRoles = await this.userService.getRolesToUserAsync(userId);
    for (const item of this.userRoles) {
      if (item == "Misafir") {
        //eğer kullanıcı misafir ise profil sayfasında adres bilgileri görünmeyecek ve default bilgiler atanacak
        this.profileForm.get("city")?.setValue(" ")
        this.profileForm.get("district")?.setValue(" ")
        this.profileForm.get("neighborhood")?.setValue(" ")
        this.profileForm.get("personalDescription")?.setValue(" ")
        this.updateHideSectionsClass(true) // misafirse bazı bölgeler gizlenir
        break;
      }
      else {
        this.updateHideSectionsClass(false) // misafir değilse gizli bölgeler açılır
      }
    }
  }

  async getUserprofileImage(userId: string) {
    const data: any = await this.userService.getProfileImages(userId)
    if (data != null) {
      this.userImagePath = data.userProfileImages[0].filePath;
    }
  }

  async onUserFormSubmit() {
    if (!this.profileForm.valid) {
      //yapay zeka bilgisiyle yazıldı.
      Object.keys(this.profileForm.controls).forEach(field => {
        const control = this.profileForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      this.toastrService.error('Formda hata var, lütfen kontrol edin.', 'Hata');
      return;
    }

    //kullanıcının girdiği username sistemde kayıtlı mı diye kontrol ediliyor
    var userId = this.profileForm.get('id')?.value
    var username = this.profileForm.get('userName')?.value;

    var usernameCheck = await this.userService.usernameCheck(username, userId); // eğer userID gönderilmezse kontrol sırasında çakışma yaşanacaktır
    if (usernameCheck) {
      this.profileForm.get('userName')?.setErrors({ usernameTaken: true });
      this.toastrService.error('Formda hata var, lütfen kontrol edin.', 'Hata');
    } else {
      this.spinnerService.show(SpinnerType.save);
      //kullanıcı bilgilerini güncellemek için bilgiler api'ye gönderilir
      this.userService.UpdateUserAsync(this.profileForm.value, () => {
        this.spinnerService.hide(SpinnerType.save);
        this.toastrService.success('Profiliniz başarıyla güncellendi', 'Başarılı');
        this.getUser(); // güncellenen bilgileri tekrar çek
      }, () => {
        this.spinnerService.hide(SpinnerType.save);
        this.toastrService.error('Profiliniz güncellenirken bir hata oluştu', 'Hata');
      });
    }
  }

  get remainingChars(): number {
    const personalDescription = this.profileForm.get('personalDescription')?.value;
    return this.DescriptionMaxLength - (personalDescription ? personalDescription.length : 0);
  }

  async loadTurkey_geo() {
    this.httpClient.Get<any>({
      //assetlerden json dosyası çekilir
      fullEndPoint: "assets/common/jsons/turkey-geo.json"
    }).subscribe(data => {
      //gelen veriler Turkey_geo dizisine atanır
      data.forEach((dat: any) => {
        this.Turkey_geo.push(dat);
      });
      // console.log(this.Turkey_geo)
    });

    //adres bilgilerinin yüklenmesi bekleniyor
    setTimeout(() => {
      if (this.profileForm.get("city")?.value != " ") {
        //kullanıcının adress bilgisi olduğu yukarda kontorl edildiği için direkt eşitleniyor
        this.equalizeAddress(this.profileForm.get('city')?.value, this.profileForm.get('district')?.value)
      }
    }, 200);
  }

  async equalizeAddress(City: string, District: string) {
    this.selectedCity = City;
    this.selectedDistrict = District;
    await this.loadDistricts(this.selectedCity);
    await this.loadNeighborhoods(this.selectedDistrict);
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
    if (City == "İl Seçiniz") {
      this.profileForm.get('district')?.setValue('');
      this.profileForm.get('neighborhood')?.setValue('');
    }
    if (this.selectedCity == City) return
    this.neighborhoods = [];// her seferinde array temizlenir
    this.loadDistricts(City);
    this.selectedCity = this.Turkey_geo.find(geo => geo.City === City);
  }

  onDistrictChange(event: any): void {
    var District = event[0].innerText;
    if (this.selectedDistrict == District) return
    this.neighborhoods = [];// her seferinde array temizlenir
    this.loadNeighborhoods(District);
    this.selectedDistrict = this.districts.find(district => district.id === event.innerText);
  }

  updateMessageClasess() {
    const stateClasses: stateCssClasses = new stateCssClasses()

    // sadece true veya false gelme duruma göre sınıflar atanıyor, default değerleri boş gelme durumda kullanıyor
    if (this.jobAppealState == true) {
      stateClasses.alert = "success"
      stateClasses.svg = "success-svg"
      stateClasses.prompt_wrap = "success-prompt-wrap"
      stateClasses.prompt_link = "success-prompt-link"
    }
    if (this.jobAppealState == false) {
      stateClasses.alert = "danger"
      stateClasses.svg = "danger-svg"
      stateClasses.prompt_wrap = "danger-prompt-wrap"
      stateClasses.prompt_link = "danger-prompt-link"
    }

    if (this.profileForm.get('profileState')?.value == false) {
      stateClasses.alert = "alert"
      stateClasses.svg = "alert-svg"
      stateClasses.prompt_wrap = "alert-prompt-wrap"
      stateClasses.prompt_link = "alert-prompt-link"
    }

    this.messageClasess = stateClasses
  }

  updateHideSectionsClass(state: boolean) {
    //gelen state bilgisine göre classlar belirleniyor
    this.secretSectionsClass = state == true ? "hide" : ""
    this.leftSideClasses = state == true ? "left-side hide" : "left-side"
    this.rightSideClasses = state == true ? "right-side-IfGuest" : "right-side"
    if (state && !this.jobAppeal) {
      this.appealButton = ""
    }
  }

  async setSpanVisibility(state: boolean) {
    this.ShowSuccessSpan = false // başlangıçta span gizlenir

    if (state == null || state == false) this.ShowSuccessSpan = true // eğer başvuru durumu null veya false ise span gösterilir
    else if (this.userImagePath == this.defaultProfileImage) this.ShowSuccessSpan = true
    else if (!this.profileForm.get('personalDescription')?.value) this.ShowSuccessSpan = true

  }

  async getUserDocument() {
    setTimeout(async () => {
      var data: any = await this.userService.getUserDocuments(this.userId)
      this.UserDocuments = data.userDocuments
      this.UserDocumentsCount = this.UserDocuments.length
    }, 150);
  }
  get visibleFiles() {
    return this.showAll ? this.UserDocuments : this.UserDocuments.slice(0, 3);
  }

  toggleShowAll() {
    this.showAll = !this.showAll;
  }

  stopAdvert() {
    this.spinnerService.show(SpinnerType.save);
    var user: User = this.profileForm.value as User;
    user.profileState = false;
    this.userService.UpdateUserAsync(user, () => {
      this.getUser();
      this.spinnerService.hide(SpinnerType.save);
      this.toastrService.success('İlan durduruldu', 'Başarılı');
    });
  }

  startAdvert() {
    this.spinnerService.show(SpinnerType.save);
    var user: User = this.profileForm.value as User;
    user.profileState = true;
    this.userService.UpdateUserAsync(user, () => {
      this.getUser();
      this.spinnerService.hide(SpinnerType.save);
      this.toastrService.success('İlan aktif edildi', 'Başarılı');
    });
  }
}

export class stateCssClasses {
  alert: string = "alert"
  svg: string = "alert-svg"
  prompt_wrap: string = "alert-prompt-wrap"
  prompt_link: string = "alert-prompt-link"
}
