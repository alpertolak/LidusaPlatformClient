import { Component, OnInit } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from './Enums/enums';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'LidusaPlatformClient';

  constructor(private toastr: ToastrService,private spinnerService:NgxSpinnerService) { }


  async ngOnInit(): Promise<any> {
    
    this.spinnerService.show(SpinnerType.load)
    this.toastr.success("başarılı", "Giriş başarılı")
    await setTimeout(() => {
      this.spinnerService.hide(SpinnerType.load)
    }, 3000);

  }


}
