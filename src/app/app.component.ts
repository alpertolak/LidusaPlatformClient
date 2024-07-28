import { Component, OnInit } from '@angular/core';
import { TestServiceService } from './test-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'LidusaPlatformClient';

  constructor(private service :TestServiceService){}


  ngOnInit(): void {
    console.log(this.service.getData().subscribe(x => console.log(x)))
  }

  
}
