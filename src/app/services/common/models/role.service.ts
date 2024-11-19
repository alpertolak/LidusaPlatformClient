import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { firstValueFrom, Observable } from 'rxjs';
import { Create_Role } from 'src/app/contracts/roles/create-role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClientService: HttpClientService) { }

  async GetRoles(page: number, size: number, successCallBack?: () => void, errorCallBack?: (errorMessage: String) => void): Promise<any> {
    const observable: Observable<any> = this.httpClientService.Get({
      controller: "roles",
      queryString: `page=${page}&size=${size}`
    })

    //TODO gelen callback fonksiyonları en kolay işleme yöntemi
    const PromiseData = firstValueFrom(observable)
    PromiseData.then(successCallBack).catch(errorCallBack)
    return await PromiseData

  }
  async CreateRole(newRole: Create_Role, successCallBack?: () => void, errorCallBack?: (errorMessage: String) => void) {
    const observable: Observable<any> = this.httpClientService.Post({
      controller: "roles",
    }, { Name: newRole.name })

    const PromiseData = firstValueFrom(observable)
    PromiseData.then(successCallBack).catch(errorCallBack)
    return await PromiseData as { succeeded: boolean }
  }
}
