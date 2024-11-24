import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SpinnerType } from 'src/app/Enums/enums';
import { _isAuthenticated, AuthService } from 'src/app/services/common/auth.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,
    private userService: UserService,
    private authService: AuthService

  ) { }
  
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    this.spinner.show(SpinnerType.load)
    const token: string = localStorage.getItem('accessToken') as string
    if(token){
      var decodedToken: any = this.jwtHelper.decodeToken(token);
      var userName = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]
      
      const userIsAdmin = await this.userService.getUserIsAdminAsync(userName); //kullanıcının admin bilgisi alınıyor.
      
      if (!userIsAdmin.isAdmin) {
        this.router.navigate([''])
        this.spinner.hide(SpinnerType.load)
      }
    }
    
    //kullanıcın accessToken bilgisi kontrol ediliyor
    let expired: boolean
    try {
      // Eğer token varsa süresi dolmuş mu kontrol et
      expired = this.jwtHelper.isTokenExpired(token);
    } catch {
      expired = true;
    }

    this.authService.identityCheck() //kullanıcının son durumunu alınıyor

    // _isAuthenticated GENÇAY 42.ders
    // Token yoksa ya da süresi dolmuşsa, login sayfasına yönlendir
    if (!_isAuthenticated) {
      this.router.navigate(['auth/login'], { queryParams: { returnUrl: state.url } });
      this.toastrService.warning("Tekrar giriş yapınız", "Oturum süresi doldu!")
      this.spinner.hide(SpinnerType.load)

      return true; // Sayfaya erişime izin ver
    }

    this.spinner.hide(SpinnerType.load)
    return true; // Token geçerliyse geçişe izin ver
  }
}