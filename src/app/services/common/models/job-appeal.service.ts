import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { firstValueFrom, Observable } from 'rxjs';
import { Create_JobAppeal } from 'src/app/contracts/JobAppeal/create-jobAppeal';
import { ListPaginationJobAppeals } from 'src/app/contracts/JobAppeal/list-pagination-JobAppeals';
import { JobAppeal } from 'src/app/entities/JobAppeal';

@Injectable({
  providedIn: 'root'
})
export class JobAppealService {

  constructor(private httpClient: HttpClientService) { }

  async getJobAppealById(appealId: string, successCallBack?: () => void, errorCallBack?: () => void): Promise<JobAppeal> {

    const observable: Observable<JobAppeal> = this.httpClient.Get<JobAppeal>({
      action: "GetJobAppealById",
      controller: "JobAppeal",
    }, appealId);
    const promiseData = firstValueFrom(observable)
    promiseData.then(successCallBack).catch(errorCallBack)

    return await promiseData
  }

  async getAllJobAppeals(page: number, size: number, successCallBack?: () => void, errorCallBack?: () => void): Promise<ListPaginationJobAppeals> {
    const observable: Observable<ListPaginationJobAppeals> = this.httpClient.Get<ListPaginationJobAppeals>({
      action: "GetAllJobAppeal",
      controller: "JobAppeal",
      queryString: `page=${page}&size=${size}`
    });

    const promiseData = firstValueFrom(observable)
    promiseData.then(successCallBack).catch(errorCallBack)

    return await promiseData
  }


  async createJobAppeal(createJobAppeal: Create_JobAppeal, successCallBack?: () => void, errorCallBack?: () => void): Promise<any> {
    const observable: Observable<any> = this.httpClient.Post<any>({
      action: "CreateJobAppeal",
      controller: "JobAppeal",
    }, createJobAppeal);
    const promiseData = firstValueFrom(observable)
    promiseData.then(successCallBack).catch(errorCallBack)

    return await promiseData
  }

  async approveJobAppeal(jobAppealId: string, successCallBack?: () => void, errorCallBack?: () => void) {
    const observable: Observable<any> = this.httpClient.Put<any>({
      action: "ApproveJobAppeal",
      controller: "JobAppeal",
    },{ jobAppealId });
    const promiseData = firstValueFrom(observable).then(successCallBack).catch(errorCallBack)
    return await promiseData
  }

  async rejectJobAppeal(jobAppealId: string, successCallBack?: () => void, errorCallBack?: () => void) {
    const observable: Observable<any> = this.httpClient.Put<any>({
      action: "RejectJobAppeal",
      controller: "JobAppeal",
    }, { jobAppealId });
    const promiseData = firstValueFrom(observable).then(successCallBack).catch(errorCallBack)
    return await promiseData
  }

}