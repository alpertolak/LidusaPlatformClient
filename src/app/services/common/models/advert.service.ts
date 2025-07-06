import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { firstValueFrom, Observable } from 'rxjs';
import { Advert } from 'src/app/entities/Advert';

@Injectable({
  providedIn: 'root'
})
export class AdvertService {

  constructor(
    private httpClientService: HttpClientService) { }

  async getAllAdverts(includeImages: boolean, includeDocuments: boolean, successCallback?: () => void, errorCallback?: (error: any) => void): Promise<Advert[]> {
    const observable: Observable<Advert[]> = this.httpClientService.Get({
      controller: "Adverts",
      action: "GetAllAdverts",
      queryString: `includeImages=${includeImages}&includeDocuments=${includeDocuments}`
    })

    const promiseData = firstValueFrom(observable)
    promiseData.then(successCallback).catch(errorCallback)
    return await promiseData
  }

  async filterAdverts(jobs: string[], name: string, genders: string[], city: string, district: string, successCallback?: () => void, errorCallback?: (error: any) => void): Promise<Advert[]> {
    const observable: Observable<Advert[]> = this.httpClientService.Get({
      controller: "Adverts",
      action: "GetFilteredAdverts",
      queryString: `jobs=${jobs}&name=${name}&genders=${genders}&city=${city}&district=${district}`
    });

    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallback).catch(errorCallback)
    return await promiseData
  }
}
