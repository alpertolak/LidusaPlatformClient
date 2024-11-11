import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationEndpointService {

  constructor(private HttpClientService: HttpClientService) { }

  //GENÇAY DERS.66 -- 1:25:00
  async assignRoleEndpoint(roles: string[], code: string, menu: string, successCallBack?: () => void, errorCallback?: (error: any) => void) {
    const observable: Observable<any> = await this.HttpClientService.Post({
      controller: "AuthorizationEndpoints"
    }, {
      Roles: roles,
      Menu: menu,
      Code: code
    })

    const promiseData = firstValueFrom(observable)
    promiseData.then(successCallBack).catch(errorCallback)
    await promiseData
  }

  async getRolesToEndpoint(code: string, menu: string, successCallBack?: () => void, errorCallBack?: (error:any) => void): Promise<string[]> {
    const observable: Observable<any> = this.HttpClientService.Post({
      controller: "AuthorizationEndpoints",
      action: "GetRolesToEndpoint"
    }, {
      code: code,
      menu: menu
    });

    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack)
      .catch(errorCallBack);

    return (await promiseData).roles;
  }
}
