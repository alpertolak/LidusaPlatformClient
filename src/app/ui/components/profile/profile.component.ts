import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/entities/User';
import { SpinnerType } from 'src/app/Enums/enums';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  //HTML bölümünde form nesnesine ulaşabilmek için get fonsksiyonu
  profileForm: FormGroup

  constructor(
    private userService: UserService,
    private toastrService: ToastrService,
    private spinnerService: NgxSpinnerService,
    private formBuilder: FormBuilder) { }


  ngOnInit(): void {
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
  }

  async getUser() {
    const userId: string = localStorage.getItem('UserId') as string
    var data: any = await this.userService.getUserByIdOrUsernameOrEmailAsync(userId)

    this.profileForm.patchValue(data.user)
  }

  openChangePasswordDialog() {
    alert('Şifre değiştirme ekranı açılacak')
  }

  onSubmit() {
    if (!this.profileForm.valid) {
      //yapay zeka bilgisiyle yazıldı.
      Object.keys(this.profileForm.controls).forEach(field => {
        const control = this.profileForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      this.toastrService.error('Formda hata var, lütfen kontrol edin.', 'Hata');
      return;
    }
    debugger
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
