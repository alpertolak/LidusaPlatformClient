import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom, Observable } from 'rxjs';
import { Token_Response } from 'src/app/contracts/token/token-response';
import { SpinnerType } from 'src/app/Enums/enums';
import { AuthService } from 'src/app/services/common/auth.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private userAuthService: UserAuthService,
    private userService: UserService,
    private toastrService: ToastrService,
    private spinnerService: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private ActivatedRoute: ActivatedRoute,
    private router: Router,
    private socialAuthService: SocialAuthService,
    private httpClientService: HttpClientService
  ) {
    //google login için api post işlemi
    socialAuthService.authState.subscribe(async (user: SocialUser) => {
      this.spinnerService.show(SpinnerType.load)
      await userAuthService.googleLogin(user, () => {

        //returnUrl Çalışması
        this.ActivatedRoute.queryParams.subscribe(params => {
          const returnUrl: string = params["returnUrl"]; // returnUrl bilgisi varsa yönledirme yapılıyor
          if (returnUrl)
            this.router.navigate([returnUrl])
        })
        this.spinnerService.hide(SpinnerType.load)
      })
    })
  }

  frm: FormGroup
  async ngOnInit() {
    this.frm = this.formBuilder.group({
      UserNameOrEmail: ["", [
        Validators.required,
      ]],
      password: ["", [
        Validators.required,
      ]]
    })
  }

  get component() {
    return this.frm.controls
  }
  submitted: boolean = false

  async onSubmit(userLogin: any) {

    this.submitted = true

    if (this.frm.invalid) return //form üzerinde herhangi bir hata varsa return ederek giriş işlemini iptal eder

    this.spinnerService.show(SpinnerType.load)
    
    this.userAuthService.login(userLogin.UserNameOrEmail, userLogin.password, () => {
      this.authService.identityCheck();

      this.ActivatedRoute.queryParams.subscribe(params => {

        const returnUrl: string = params["returnUrl"]; // returnUrl bilgisi varsa yönledirme yapılıyor
        if (returnUrl)
          this.router.navigate([returnUrl])
      })
      this.spinnerService.hide(SpinnerType.load)
    },()=>{
      this.spinnerService.hide(SpinnerType.load)
      this.toastrService.error("Kullanıcı adı veya şifre hatalıdır","Giriş başarısız!")
    })
  }
}
