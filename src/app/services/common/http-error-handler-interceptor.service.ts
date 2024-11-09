import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, of } from 'rxjs';
import { UserAuthService } from './models/user-auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/Enums/enums';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastrService: ToastrService, private userAuthService: UserAuthService,private spinnerService:NgxSpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error => {
      console.log(error)
      switch (error.status) {
        case HttpStatusCode.Unauthorized:
          this.userAuthService.refreshTokenLogin(localStorage.getItem("refreshToken") as string).then(data => {
            this.toastrService.warning("Bu işlemi yapmak için yetkiniz yoktur","Yetkisiz işlem")
           })
          break
        case HttpStatusCode.InternalServerError:
          this.spinnerService.hide(SpinnerType.load)

          // this.toastrService.error("Sunucu Kaynaklı bir hata oluştu", "Sunucu Hatası")
          break
        case HttpStatusCode.BadRequest:
          this.spinnerService.hide(SpinnerType.load)
          // this.toastrService.error("Lüfen daha sonra tekrar deneyiniz","Bir Hata Oluştu")
          break
        default:
          this.spinnerService.hide(SpinnerType.load)
          // this.toastrService.error("Lüfen daha sonra tekrar deneyiniz","Bir Hata Oluştu")

          break
      }
      return of(error)
    }))
  }
}
