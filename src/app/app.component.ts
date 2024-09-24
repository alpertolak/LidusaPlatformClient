import { Component, OnInit } from '@angular/core';
import { HttpClientService } from './services/common/http-client.service';
import { AuthService } from './services/common/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthService) {
    authService.identityCheck()
  }
}
