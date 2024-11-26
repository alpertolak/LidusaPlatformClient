import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    private router: Router,
    private toarstrService:ToastrService

  ) { }

  logOut() {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    this.router.navigate(['auth/login'])
    this.toarstrService.success("Çıkış işlemi başarılı")
  }
}
