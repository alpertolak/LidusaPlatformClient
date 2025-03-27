import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { User_Profile_Image } from 'src/app/contracts/users/user-profile-image';
import { SpinnerType } from 'src/app/Enums/enums';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { HttpClientService } from 'src/app/services/common/http-client.service';
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


  DescriptionMaxLength: number = 300; //açıklama için Karakter sınırı

  //HTML bölümünde form nesnesine ulaşabilmek için get fonsksiyonu
  profileForm: FormGroup //profil formu
  changePasswordForm: FormGroup //şifre değiştirme formu
  isChangePassword: boolean = false
  userImage: User_Profile_Image = new User_Profile_Image()
  userImagePath: string = "../../../../assets/common/profile.jpg"
  userId: string = localStorage.getItem('UserId') as string
  userRoles: string[] = []
  isGuest: boolean = true // kullanıcı rolüne göre profil sayfası görüntülenir

  //GENÇAY 25.DERS
  @Output() fileUploadOptions: Partial<FileUploadOptions> = {
    action: "Upload-User-Profile-Image",
    controller: "users",
    accept: ".png, .jpg, .pdf",
    buttonName: "Resim seç",
    queryString: `userId=${this.userId}`,
  }

  constructor(
    private userService: UserService,
    private toastrService: ToastrService,
    private spinnerService: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private httpClient: HttpClientService) { }


  async ngOnInit() {
    this.loadTurkey_geo()
    this.createForm()
    this.getUser()
  }

  async equalizeAddress(City: string, District: string) {
    this.selectedCity = City;
    this.selectedDistrict = District;
    this.loadDistricts(this.selectedCity);
    this.loadNeighborhoods(this.selectedDistrict);

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
      city: ['', Validators.required],
      district: ['', Validators.required],
      neighborhood: ['', Validators.required],
      twoFactorEnabled: [false],
      personalDescription: ['', [Validators.maxLength(this.DescriptionMaxLength)]],
    });
  }
  async getUser() {
    var data: any = await this.userService.getCurrentUserAsync()
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
      city: data.user.userAddress?.city || '',
      district: data.user.userAddress?.district || '',
      neighborhood: data.user.userAddress?.neighborhood || ''
    });

    //console.log(this.profileForm.value)

    //kullanıcının rolleri çekiliyor
    this.getUserRoles(data.user.id)

    //kullanıcı resimi çekiliyor
    this.getUserprofileImage(data.user.id)
  }

  async getUserRoles(userId: string) {

    this.userRoles = await this.userService.getRolesToUserAsync(userId);
    for (const item of this.userRoles) {
      if (item == "Misafir") {
        this.isGuest = false;
        break;
      }
      else {
        this.isGuest = true;
      }
    }
  }

  async getUserprofileImage(userId: string) {
    this.userImage = await this.userService.getProfileImage(userId)
    if (this.userImage != null) {
      this.userImagePath = this.userImage.filePath
    }
  }

  onUserFormSubmit() {
    console.log(this.profileForm.value)
    if (!this.profileForm.valid) {
      //yapay zeka bilgisiyle yazıldı.
      Object.keys(this.profileForm.controls).forEach(field => {
        const control = this.profileForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      this.toastrService.error('Formda hata var, lütfen kontrol edin.', 'Hata');
      return;
    }
    this.spinnerService.show(SpinnerType.save);
    //kullanıcı bilgilerini güncellemek için bilgiler api'ye gönderilir
    this.userService.UpdateUserAsync(this.profileForm.value, () => {
      this.spinnerService.hide(SpinnerType.save);
      this.toastrService.success('Profiliniz başarıyla güncellendi', 'Başarılı');
    }, () => {
      this.spinnerService.hide(SpinnerType.save);
      this.toastrService.error('Profiliniz güncellenirken bir hata oluştu', 'Hata');
    });
  }

  get remainingChars(): number {
    const personalDescription = this.profileForm.get('personalDescription')?.value;
    return this.DescriptionMaxLength - (personalDescription ? personalDescription.length : 0);
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

      //kullanıcının adress bilgisi eşitleniyor
      this.equalizeAddress(this.profileForm.get('city')?.value, this.profileForm.get('district')?.value)
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
    if(City == "İl Seçiniz") {
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
}
