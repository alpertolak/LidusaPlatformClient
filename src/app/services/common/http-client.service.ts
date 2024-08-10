import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, partition } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient, @Inject("baseUrl") private baseUrl: string) { }

  private url(requestParameter: Partial<RequestParameters>): string {
    
    return `${requestParameter.baseUrl ? requestParameter.baseUrl : this.baseUrl}/${requestParameter.controller}${requestParameter.action ?`/${requestParameter.action}`:""}`;
  }
  Get<T>(requestParameter: Partial<RequestParameters>, Id?: string): Observable<T> {
    
    let url: string = ""

    if (requestParameter.fullEndPoint)
      url = requestParameter.fullEndPoint
    else
      url = `${this.url(requestParameter)}${Id ? `/${Id}` : ""}${requestParameter.queryString ? `?${requestParameter.queryString}`:""}`

    return this.httpClient.get<T>(url, { headers: requestParameter.headers })
  }

  Post<T>(requestParameter: Partial<RequestParameters>, body: Partial<T>): Observable<T> {
    
    let url: string = ""

    if (requestParameter.fullEndPoint)
      url = requestParameter.fullEndPoint;
    else
      url = `${this.url(requestParameter)}${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`

    return this.httpClient.post<T>(url, body, { headers: requestParameter.headers })
  }

  Put<T>(requestParameter: Partial<RequestParameters>, body: Partial<T>): Observable<T> {

    let url: string = ""

    if (requestParameter.fullEndPoint)
      url = requestParameter.fullEndPoint;
    else
      url = `${this.url(requestParameter)}${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`

    return this.httpClient.put<T>(url, body,{headers: requestParameter.headers})
  }


  Delete<T>(requestParameter: Partial<RequestParameters>,id : string): Observable<T> {

    let url: string = ""

    if (requestParameter.fullEndPoint)
      url = requestParameter.fullEndPoint;
    else
      url = `${this.url(requestParameter)}/${id}${requestParameter.queryString?`?${requestParameter.queryString}` : ""}`;

    return this.httpClient.delete<T>(url,{headers: requestParameter.headers})
  }
}

export class RequestParameters {
  controller?: string
  action?: string
  queryString?:string

  headers?: HttpHeaders
  baseUrl?: string
  fullEndPoint?: string

}
