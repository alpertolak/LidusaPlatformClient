import { Component, OnInit } from '@angular/core';
import { TestServiceService } from './test-service.service';
import { IndividualConfig, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'LidusaPlatformClient';

  constructor(private service: TestServiceService, private toastr: ToastrService) { }


  ngOnInit(): void {
    console.log(this.service.getData().subscribe(x => console.log(x)))
    const config: Partial<IndividualConfig> = {
      timeOut: 5000,
      closeButton: true,
      progressBar: true,
      positionClass: 'toast-bottom-right'
    }
    this.toastr.warning("başarılı", "başarılı")
  }


}
