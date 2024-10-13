import { Component, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SpinnerType } from 'src/app/Enums/enums';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.css'
})
export class PasswordResetComponent {

  constructor(
    private userAuthService: UserAuthService,
    private spinnerService: NgxSpinnerService,
    private toastrService: ToastrService
  ) { }

  @Output() mailSend: boolean = false

  passwordReset(email: string) {
    this.spinnerService.show(SpinnerType.load)
    this.userAuthService.passwordReset(email,
      () => {
        this.mailSend = true
        this.spinnerService.hide(SpinnerType.load)
      }, (error) => {
        this.spinnerService.hide(SpinnerType.load)
        this.toastrService.error(error,"hata")
      });
    return false
  }
}
