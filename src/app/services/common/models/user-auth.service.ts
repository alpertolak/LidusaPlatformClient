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
    if (token)
      localStorage.setItem("accessToken", token.token.accessToken);

    this.toastrService.success("Kullanıcı girişi başarılı", "Başarılı")

    callBackFunction()
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

      // Başarılı giriş mesajı gösteriliyor
      this.toastrService.success("Google giriş başarılı", "Giriş Başarılı")
    }
    //callback fonksiyonu var ise çağırılıyor
    if (callBackFunction) callBackFunction();
  }
}
