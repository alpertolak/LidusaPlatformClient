import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AdminModule } from './admin/admin.module';
import { LayoutModule } from "./admin/layout/layout.module";
import { UiModule } from './ui/ui.module';
import { RegisterModule } from './login/register/register.module';
import { RouterModule } from '@angular/router';
import { LoginModule } from './login/login/login.module';
import { JwtModule } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    RouterModule,
    AdminModule,
    UiModule,
    RegisterModule,
    LoginModule,
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
    LayoutModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem("accessToken"), //token bilgisi api istekleri için header'a yazdırılıyor.
        allowedDomains: ["localhost:7147"], //güvenlik açığı olmaması için hangi domainlere istek yaparken token header'a koyulacak o belirtiliyor.
      }
    })
  ],
  providers: [
    { provide: "baseUrl", useValue: "https://localhost:7147/api", multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
