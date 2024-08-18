import { Component, OnInit } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from './Enums/enums';
import { HttpClientService } from './services/common/http-client.service';

declare var $: any
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'LidusaPlatformClient';

  constructor(private toastr: ToastrService, private spinnerService: NgxSpinnerService, private httpService: HttpClientService) { }


  async ngOnInit(): Promise<any> {

    this.spinnerService.show(SpinnerType.load)
    await setTimeout(() => {
      this.spinnerService.hide(SpinnerType.load)
    }, 1000);

  }

}
