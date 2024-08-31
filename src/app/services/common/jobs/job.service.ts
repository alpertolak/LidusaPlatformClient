import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Job } from 'src/app/contracts/jobs/create-Job';
import { HttpErrorResponse } from '@angular/common/http';
import { ListJobsPagination } from 'src/app/contracts/jobs/list-pagination';
import { Job } from 'src/app/contracts/jobs/job';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private httpService: HttpClientService) { }

  createJob(create_job: Create_Job, successCallBack: () => void, errorCallBack: (errorMessage: String) => void) {
    this.httpService.Post({
      controller: "jobs"
    }, create_job)
      .subscribe(result => {
        successCallBack()
      }, (errorResponse: HttpErrorResponse) => {
        const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error
        let message = ""
        _error.forEach((v, index) => {
          v.value.forEach((_v, _index) => {
            message += `${_v}\n`
          });
        });
        errorCallBack(message)
      })
  }

  async read(page: number = 0, size: number = 5, successCallBack: () => void, errorCallBack: (errorMessage: String) => void): Promise<ListJobsPagination> {
    const promiseData: Promise<ListJobsPagination> = this.httpService.Get<ListJobsPagination>({
      controller: "jobs",
      queryString: `page=${page}&size=${size}`
    }).toPromise()

    promiseData.then(d => successCallBack()).catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message))

    return await promiseData
  }

  async deleteJob(id: string) {
    const deleteObservable: Observable<any> = this.httpService.Delete<any>({
      controller: "jobs"
    }, id)

    await firstValueFrom(deleteObservable);
  }
}
