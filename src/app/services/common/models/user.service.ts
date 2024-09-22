import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_User } from 'src/app/contracts/users/create-user';
import { firstValueFrom, observable, Observable } from 'rxjs';
import { User } from 'src/app/entities/User';
import { ToastrService } from 'ngx-toastr';
import { Token } from 'src/app/contracts/token/Token';
import { Token_Response } from 'src/app/contracts/token/token-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpService: HttpClientService,
    private toastrService:ToastrService,
  ) { }

  async create(user: User): Promise<Create_User> {
    const observable: Observable<Create_User | User> = this.httpService.Post<Create_User | User>({
      controller: "users",
    }, user)
    return await firstValueFrom(observable) as Create_User
  }

  async login(usernameOrEmail: string, password: string, callBackFunction: () => void): Promise<void> {
    const observable: Observable<any | Token_Response> = this.httpService.Post<any | Token_Response>({
      controller: "users",
      action: "login"
    }, { usernameOrEmail, password })

    const token: Token_Response = await firstValueFrom(observable) as Token_Response
    if(token)
      localStorage.setItem("accessToken",token.token.accessToken);

      this.toastrService.success("Kullanıcı girişi başarılı","Başarılı")

    callBackFunction()
  }

}
