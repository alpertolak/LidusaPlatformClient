import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClientService: HttpClientService) { }

  async GetRoles(page: number, size: number, successCallBack?: () => void, errorCallBack?: (errorMessage: String) => void) {
    const observable: Observable<any> = this.httpClientService.Get({
      controller: "roles",
      queryString: `page=${page}&size=${size}`
    })
    
    //TODO gelen callback fonksiyonları en kolay işleme yöntemi
    const PromiseData = firstValueFrom(observable)
    PromiseData.then(successCallBack).catch(errorCallBack)
    return await PromiseData 

  }
  async CreateRole(roleName: string, successCallBack?: () => void, errorCallBack?: (errorMessage: String) => void) {
    const observable: Observable<any> = this.httpClientService.Post({
      controller: "roles",
    }, { Name: roleName })

    const PromiseData = firstValueFrom(observable)
    PromiseData.then(successCallBack).catch(errorCallBack)
    return await PromiseData as {succeeded:boolean}
  }
}
