import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/common/auth.service';

@Component({
  selector: 'app-uheader',
  templateUrl: './uheader.component.html',
  styleUrl: './uheader.component.css'
})
export class UheaderComponent {

  constructor(public authService: AuthService) { }

}