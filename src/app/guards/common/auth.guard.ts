import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SpinnerType } from 'src/app/Enums/enums';
import { _isAuthenticated } from 'src/app/services/common/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private jwtHelper: JwtHelperService, private router: Router,private toastrService: ToastrService,private spinner:NgxSpinnerService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.spinner.show(SpinnerType.load)
    const token: string | null = localStorage.getItem('accessToken');

    let expired: boolean;
    try {
      // Eğer token varsa süresi dolmuş mu kontrol et
      expired = this.jwtHelper.isTokenExpired(token);
    } catch {
      expired = true;
    }

    // _isAuthenticated GENÇAY 42.ders
    // Token yoksa ya da süresi dolmuşsa, login sayfasına yönlendir
    if (!_isAuthenticated) {
      this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
      this.toastrService.warning("Tekrar giriş yapınız","Oturum süresi doldu!")
      this.spinner.hide(SpinnerType.load)

      return true; // Sayfaya erişime izin ver
    }

    this.spinner.hide(SpinnerType.load)
    return true; // Token geçerliyse geçişe izin ver
  }
}