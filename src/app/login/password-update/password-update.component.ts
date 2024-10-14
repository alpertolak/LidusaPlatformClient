import { Component, OnInit, Output, output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SpinnerType } from 'src/app/Enums/enums';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-password-update',
  templateUrl: './password-update.component.html',
  styleUrl: './password-update.component.css'
})
export class PasswordUpdateComponent implements OnInit {

  constructor(
    private spinnerService: NgxSpinnerService,
    private userAuthService: UserAuthService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private toastrService: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  frm: FormGroup
  state: any = false
  submittedClass: boolean = false
  submitted: boolean = false

  //GENÇAY DERS.60
  async ngOnInit(): Promise<void> {
    this.activatedRoute.params.subscribe({
      next: async params => {
        const userId: string = params["userId"]
        const resetToken: string = params["resetToken"]
        this.state = await this.userAuthService.verifyResetToken(resetToken, userId, () => {
          this.state = true
          this.spinnerService.hide(SpinnerType.load)
        });
      }
    })

    this.frm = this.formBuilder.group({
      password: ["", [
        Validators.required,
        Validators.minLength(3)
      ]],
      passwordConfirm: ["", [
        Validators.required
      ]]
    }, {
      //şifre karşılaştırma işlemi GENÇAY 37.DERS
      //şiir yazıldı :D
      validators: (group: AbstractControl): ValidationErrors | null => {
        let password = group.get("password")?.value
        let rePassword = group.get("passwordConfirm")?.value
        if (password == rePassword) {
          if(password != ""){
            return null
          }
          return { notSame: true }
        }
        else return { notSame: true }
      }
    })
  }

  get component() {
    return this.frm.controls
  }

  onSubmit(password: string, passwordConfirm: string) {
    this.submitted = true
    if (this.frm.invalid) {
      this.submittedClass = true //eğer kullanıcı formu submit ettiyse ve hata varsa hata sınıfları inputlar veriliyor
      return //form üzerinde herhangi bir hata varsa return ederek kayıt işlemini iptal eder
    }
    this.passwordUpdate(password, passwordConfirm)
  }

  passwordUpdate(password: string, passwordConfirm: string) {
    this.spinnerService.show(SpinnerType.load)
    this.activatedRoute.params.subscribe({
      next: async params => {
        const userId: string = params["userId"];
        const resetToken: string = params["resetToken"];
        await this.userService.passwordUpdate(userId, resetToken, password, passwordConfirm, () => {
          this.spinnerService.hide(SpinnerType.load);
          this.router.navigate(["/login"]);
          this.toastrService.success("Şifreniz başarıyla değiştirilmiştir", "Başarılı");
        }, (error) => {
          this.spinnerService.hide(SpinnerType.load);
          // this.toastrService.error(error, "Hata");
        });
      }
    });
  }
}
