import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Token_Response } from 'src/app/contracts/token/token-response';
import { HttpClientService } from '../http-client.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(
    private httpService: HttpClientService,
    private toastrService: ToastrService,
  ) { }
  async login(usernameOrEmail: string, password: string, callBackFunction: () => void): Promise<void> {
    const observable: Observable<any | Token_Response> = this.httpService.Post<any | Token_Response>({
      controller: "auth",
      action: "login"
    }, { usernameOrEmail, password })

    const token: Token_Response = await firstValueFrom(observable) as Token_Response
    if (token) {
      localStorage.setItem("accessToken", token.token.accessToken);
      localStorage.setItem("refreshToken", token.token.refreshToken);
      this.toastrService.success("Kullanıcı girişi başarılı", "Başarılı")
    }

    callBackFunction()
  }

  async refreshTokenLogin(refreshToken: string, callBackFunction?: () => void): Promise<any> {
    debugger
    const observable: Observable<any | Token_Response> = await this.httpService.Post({
      action: "refreshTokenLogin",
      controller: "auth",
    }, refreshToken)

    const tokenResponse: Token_Response = await firstValueFrom(observable) as Token_Response
    if (tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);
    }
  }


  async googleLogin(user: SocialUser, callBackFunction?: () => void) {
    const observable: Observable<SocialUser | Token_Response> = await this.httpService.Post<SocialUser | Token_Response>({
      controller: "auth",
      action: "google-login"
    }, user)
    // Observable'dan gelen yanıtı Promise'e çevirerek token alıyoruz
    const tokenResponse: Token_Response = await firstValueFrom(observable) as Token_Response;

    if (tokenResponse) {
      // Eğer tokenResponse varsa, access token'ı localStorage'a kaydediyoruz
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);

      // Başarılı giriş mesajı gösteriliyor
      this.toastrService.success("Google giriş başarılı", "Giriş Başarılı")
    }
    //callback fonksiyonu var ise çağırılıyor
    if (callBackFunction) callBackFunction();
  }
}
