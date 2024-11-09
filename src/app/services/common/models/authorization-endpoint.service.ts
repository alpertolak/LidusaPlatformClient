import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationEndpointService {

  constructor(private HttpClientService: HttpClientService) { }

  //GENÇAY DERS.66 -- 1:25:00
  async assignRoleEndpoint(roles: string[], code: string, menu: string, successCallBack?: () => void, errorCallback?: () => void) {
    const observable: Observable<any> = await this.HttpClientService.Post({
      controller: "AuthorizationEndpoints"
    }, {
      Roles: roles,
      Menu: menu,
      Code: code
    })
    const promiseData = observable.subscribe({
      next: successCallBack,
      error: errorCallback
    })
    await promiseData
  }
}
