import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_User } from 'src/app/contracts/users/create-user';
import { firstValueFrom, observable, Observable } from 'rxjs';
import { User } from 'src/app/entities/User';
import { ToastrService } from 'ngx-toastr';
import { Token } from 'src/app/contracts/token/Token';
import { Token_Response } from 'src/app/contracts/token/token-response';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpService: HttpClientService,
    private toastrService: ToastrService,
  ) { }

  async create(user: User): Promise<Create_User> {
    const observable: Observable<Create_User | User> = this.httpService.Post<Create_User | User>({
      controller: "users",
    }, user)
    return await firstValueFrom(observable) as Create_User
  }

  //GENÇAY DERS.60
  async passwordUpdate(userId: string, resetToken: string, password: string, passwordConfirm: string, successCallback?: () => void, errorCallback?: (error: any) => void) {
    const observable: Observable<any> = this.httpService.Post({
      controller: "users",
      action: "password-update"
    }, {
      UserId: userId,
      resetToken: resetToken,
      Password: password,
      PasswordConfirm: passwordConfirm
    });
    //TODO api hata ayıklama sistemi
    try {
      const promiseData: any = await firstValueFrom(observable);
      if (successCallback) successCallback();

    } catch (error) {
      if (errorCallback) errorCallback(error);
    }
  }
}
