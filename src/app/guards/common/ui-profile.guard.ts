import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { SpinnerType } from "src/app/Enums/enums";
import { _isAuthenticated, AuthService } from "src/app/services/common/auth.service";
import { UserService } from "src/app/services/common/models/user.service";

@Injectable({
    providedIn: 'root',
})

export class uiProfileGuard implements CanActivate {
    constructor(
        private jwtHelper: JwtHelperService,
        private router: Router,
        private toastrService: ToastrService,
        private spinner: NgxSpinnerService,
        private userService: UserService,
        private authService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        this.spinner.show(SpinnerType.load)
        const token: string = localStorage.getItem('accessToken') as string
        //kullanıcın accessToken bilgisi kontrol ediliyor
        let expired: boolean
        try {
            // Eğer token varsa süresi dolmuş mu kontrol et
            expired = this.jwtHelper.isTokenExpired(token);
        } catch {
            expired = true;
        }

        this.authService.identityCheck() //kullanıcının son durumunu alınıyor

        if (!_isAuthenticated) {
            this.router.navigate(['auth/login'], { queryParams: { returnUrl: state.url } });
            this.spinner.hide(SpinnerType.load)
            return true; // Sayfaya erişime izin ver
        }

        this.spinner.hide(SpinnerType.load)
        return true; // Token geçerliyse geçişe izin ver
    }

}