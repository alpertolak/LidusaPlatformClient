import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { firstValueFrom, Observable } from 'rxjs';
import { Menu } from 'src/app/contracts/application-configurations/Menu';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private httpService: HttpClientService) { }

  async getAuthorizeDefinitionEndpoints() {
    const observable: Observable<Menu[]> = this.httpService.Get<Menu[]>({
      controller: "ApplicationServices"
    })
 
    return await firstValueFrom(observable)
  }
}
