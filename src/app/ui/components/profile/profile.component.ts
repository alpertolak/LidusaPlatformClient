import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { User_Profile_Image } from 'src/app/contracts/users/user-profile-image';
import { SpinnerType } from 'src/app/Enums/enums';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  DescriptionMaxLength: number = 300; // Karakter sınırı

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
    private router: Router) { }


  async ngOnInit() {
    //Form nesnesi oluşturulur ve form elemanlarına başlangıç değerleri atanır
    this.profileForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      userName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      phoneNumber: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(11)]],
      city: ['', [Validators.maxLength(50)]],
      district: ['', [Validators.maxLength(50)]],
      neighborhood: ['', [Validators.maxLength(50)]],
      twoFactorEnabled: [false],
      personalDescription: ['', [Validators.maxLength(300)]],
    });
    this.getUser();
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

    //kullanıcının rolleri çekiliyor
    this.getUserRoles(data.user.id)

    //kullanıcı resi çekiliyor
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
}
