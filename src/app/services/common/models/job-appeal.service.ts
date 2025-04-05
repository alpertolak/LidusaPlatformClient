import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { firstValueFrom, Observable } from 'rxjs';
import { Create_JobAppeal } from 'src/app/contracts/JobAppeal/create-jobAppeal';

@Injectable({
  providedIn: 'root'
})
export class JobAppealService {

  constructor(private httpClient: HttpClientService) { }

  async createAppeal(createJobAppeal: Create_JobAppeal, successCallBack? :() => void,errorCallBack? :() => void): Promise<any> {
   const observable: Observable<any>  = this.httpClient.Post<any>({
      action: "create-appeal",
      controller: "JobAppeal",
    }, createJobAppeal);
    debugger
    const data : any = await firstValueFrom(observable).then(successCallBack).catch(errorCallBack);
    return data;
  }
}