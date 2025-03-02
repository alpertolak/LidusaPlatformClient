import { NgComponentOutlet } from '@angular/common';
import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  userId: string = localStorage.getItem('UserId') as string

  //HTML bölümünde form nesnesine ulaşabilmek için get fonsksiyonu
  profileForm: FormGroup //profil formu
  changePasswordForm: FormGroup //şifre değiştirme formu
  isChangePassword: boolean = false
  userImage: User_Profile_Image = new User_Profile_Image()
  userImagePath: string = "../../../../assets/common/profile.jpg"

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
      twoFactorEnabled: [false]
    });

    this.getUser();

    //kullanıcının profil resmi getirilir
    this.userImage = await this.userService.getProfileImage(this.userId)
    if (this.userImage != null) {
      this.userImagePath = this.userImage.filePath
    }
  }

  async getUser() {
    const userId: string = localStorage.getItem('UserId') as string
    var data: any = await this.userService.getUserByIdOrUsernameOrEmailAsync(userId)

    this.profileForm.patchValue(data.user)
  }

  onUserFormSubmit() {
    debugger
    if (!this.profileForm.valid) {
      //yapay zeka bilgisiyle yazıldı.
      Object.keys(this.profileForm.controls).forEach(field => {
        const control = this.profileForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      this.toastrService.error('Formda hata var, lütfen kontrol edin.', 'Hata');
      return;
    }
    console.log(this.profileForm.value);
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
}
