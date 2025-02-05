import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //GENÇAY 42.DERS
  constructor(private jwtHelper: JwtHelperService) { }

  identityCheck() {
    const token: string | null = localStorage.getItem('accessToken');

    let expired: boolean;
    try {
      // Eğer token varsa süresi dolmuş mu kontrol et
      expired = this.jwtHelper.isTokenExpired(token);
    } catch {
      expired = true;
    }

    _isAuthenticated = token != null && !expired
  }
  get isAuthenticated(): boolean {
    return _isAuthenticated //TODO ui sayfasında giriş yapıldıktan sonra, çıkış yap butonu vs. için GENÇAY 42.DERS izle
  }
  SingOut() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.identityCheck();
  }
}

export let _isAuthenticated: boolean