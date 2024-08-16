import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AdminModule } from './admin/admin.module';
import { LayoutModule } from "./admin/layout/layout.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AdminModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ToastrModule.forRoot({
        timeOut: 5000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
        closeButton: true,
        progressBar: true,
    }),
    BrowserAnimationsModule,
    NgxSpinnerModule,
    LayoutModule
],
  providers: [
    { provide: "baseUrl", useValue: "https://localhost:7147/api", multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
