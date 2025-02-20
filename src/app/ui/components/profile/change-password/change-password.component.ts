import { Component, OnInit, Output, output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SpinnerType } from 'src/app/Enums/enums';
import { UserService } from 'src/app/services/common/models/user.service';
import { CustomValidators } from 'src/app/Validators/CustomPasswordValidators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  showPassword: boolean = false;
  changePasswordForm: FormGroup;
  userId: string = localStorage.getItem('UserId') as string

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: ToastrService,
    private spinnerService: NgxSpinnerService,
    private router: Router) { }

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group({
      currentPassword: ['', [Validators.required, Validators.maxLength(50)]],
      newPassword: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    });
  }

  onSubmit() {
    if (!this.changePasswordForm.valid) {
      Object.keys(this.changePasswordForm.controls).forEach(field => {
        const control = this.changePasswordForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      return;
    }

    const changePasswordData = {
      currentPassword: this.changePasswordForm.get('currentPassword')?.value,
      newPassword: this.changePasswordForm.get('newPassword')?.value
    };
    this.spinnerService.show(SpinnerType.save)
    const result = this.userService.changePassword(
      this.userId,
      changePasswordData.currentPassword,
      changePasswordData.newPassword,
      (message: string) => {
        this.spinnerService.hide(SpinnerType.save)
        this.toastrService.success("Şifre değiştirilmiştir", 'Başarılı');
        this.router.navigate(['/profile']);
      },
      (error: any) => {
        this.spinnerService.hide(SpinnerType.save)
        this.toastrService.warning('Geçerli şifreyi yanlış girdiniz', 'Hata');
      }
    );
  }
  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}