import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SpinnerType } from 'src/app/Enums/enums';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.css'
})
export class PasswordResetComponent implements OnInit {

  constructor(
    private userAuthService: UserAuthService,
    private spinnerService: NgxSpinnerService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,

  ) { }

  frm: FormGroup
  async ngOnInit() {
    this.frm = this.formBuilder.group({
      Email: ["", [
        Validators.required,
        Validators.email
      ]]
    })
  }
  //HTML bölümünde form nesnesine ulaşabilmek için get fonsksiyonu
  get component() {
    return this.frm.controls
  }

 //submitted işlemler için değişkenler
 submittedClass: boolean = false
 submitted: boolean = false

  async onSubmit(email: string) {
    this.submitted = true

    if (this.frm.invalid){
      this.submittedClass = true //eğer kullanıcı formu submit ettiyse ve hata varsa hata sınıfları inputlar veriliyor
      return //form üzerinde herhangi bir hata varsa return ederek giriş işlemini iptal eder
    } 
    this.passwordReset(email)
  }

  //output sil dene çalışıyor mu?
  @Output() mailSend: boolean = false

  passwordReset(email: string) {
    this.spinnerService.show(SpinnerType.load)
    this.userAuthService.passwordReset(email,
      () => {
        this.mailSend = true
        this.spinnerService.hide(SpinnerType.load)
      }, (error) => {
        this.spinnerService.hide(SpinnerType.load)
        this.toastrService.error(error, "hata")
      });
    return false
  }
}
