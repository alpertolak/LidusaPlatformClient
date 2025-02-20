import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Token_Response } from 'src/app/contracts/token/token-response';
import { HttpClientService } from '../http-client.service';
import { ToastrService } from 'ngx-toastr';
import { state } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(
    private httpService: HttpClientService,
    private toastrService: ToastrService,
  ) { }
  async login(usernameOrEmail: string, password: string, successCallBackFunction?: () => void, errorCallBackFunction?: () => void): Promise<void> {
    
    // HTTP isteği oluştur ve bir Observable döndür
    const observable: Observable<any | Token_Response> = this.httpService.Post<any | Token_Response>({
      controller: "auth",
      action: "login"
    }, { usernameOrEmail, password })

    try {
      // Observable'dan ilk değeri al ve token'a dönüştür
      const token: Token_Response = await firstValueFrom(observable)

      if (token) {
        // Token'ı localStorage'a kaydet
        localStorage.setItem("accessToken", token.token.accessToken)
        localStorage.setItem("refreshToken", token.token.refreshToken)

        // Başarılı giriş mesajı göster
        this.toastrService.success("Kullanıcı girişi başarılı", "Başarılı")

        // Başarı durumunda callback fonksiyonunu çağır (eğer tanımlanmışsa)
        if (successCallBackFunction) successCallBackFunction()
      }
    } catch {
      // Hata durumunda callback fonksiyonunu çağır (eğer tanımlanmışsa)
      if (errorCallBackFunction) errorCallBackFunction()
    }

  }

  async refreshTokenLogin(refreshToken: string, successCallBackFunction?: () => void, errorCallBackFunction?: () => void): Promise<Token_Response> {
    const observable: Observable<Token_Response | any> = this.httpService.Post({
      action: "RefreshTokenLogin",
      controller: "auth",
    }, { RefreshToken: refreshToken })

    const tokenResponse: Token_Response = await firstValueFrom(observable)

    if (tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken)
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken)

      if (successCallBackFunction) successCallBackFunction()
    } else
      if (errorCallBackFunction) errorCallBackFunction() //errorcallback fonksiyonu çağırılıyor

    return tokenResponse;
  }

  async googleLogin(user: SocialUser, successCallBackFunction?: () => void, errorCallBackFunction?: () => void) {
    const observable: Observable<SocialUser | Token_Response> = await this.httpService.Post<SocialUser | Token_Response>({
      controller: "auth",
      action: "google-login"
    }, user)
    // Observable'dan gelen yanıtı Promise'e çevirerek token alıyoruz
    const tokenResponse: Token_Response = await firstValueFrom(observable) as Token_Response

    if (tokenResponse) {
      // Eğer tokenResponse varsa, access token'ı localStorage'a kaydediyoruz
      localStorage.setItem("accessToken", tokenResponse.token.accessToken)
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken)

      // Başarılı giriş mesajı gösteriliyor
      this.toastrService.success("Google giriş başarılı", "Giriş Başarılı")

      //callback fonksiyonu var ise çağırılıyor
      if (successCallBackFunction) successCallBackFunction()
    }
    else {
      if (errorCallBackFunction) errorCallBackFunction() //errorcallback fonksiyonu çağırılıyor
    }
  }

  async passwordReset(email: string, successCallBack?: () => void, errorCallBack?: (error: any) => void) {
    debugger
    const observable: Observable<any> = await this.httpService.Post({
      controller: "auth",
      action: "password-reset"
    }, { Email: email })

    try {
      const promiseData: any = await firstValueFrom(observable);
      if (successCallBack) successCallBack();

    } catch (error) {
      if (errorCallBack) errorCallBack(error);
    }
  }

  async verifyResetToken(resetToken: string, userId: String, successCallBack?: () => void): Promise<Boolean> {

    const observable: Observable<any> = await this.httpService.Post({
      controller: "auth",
      action: "verify-reset-token"
    }, {
      ResetToken: resetToken,
      UserId: userId
    })

    const State: boolean = await firstValueFrom(observable) as boolean
    if (successCallBack) successCallBack()
    return State
  }
}
