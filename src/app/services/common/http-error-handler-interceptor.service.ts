import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, of } from 'rxjs';
import { UserAuthService } from './models/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastrService: ToastrService, private userAuthService: UserAuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error => {
      switch (error.status) {
        //TODO şu anda çalışmıyor düzelt
        case HttpStatusCode.Unauthorized:
          this.toastrService.warning("Bu işlemi yapmak için yetkiniz bulunmamaktadır", "Yetkisiz İşlem")
          this.userAuthService.refreshTokenLogin(localStorage.getItem("refreshToken") as string).then(data => { })
          break
        case HttpStatusCode.InternalServerError:
          this.toastrService.error("Sunucu Kaynaklı bir hata oluştu", "Sunucu Hatası")
          break
        case HttpStatusCode.BadRequest:
          this.toastrService.warning("Geçersiz İstek")
          break
        default:
          this.toastrService.error("Bir Hata Oluştu")
          break
      }
      return of(error)
    }))
  }
}
