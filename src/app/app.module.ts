import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
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
import { LoginComponent } from './login/login/login.component';
import { GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
    ],
    bootstrap: [AppComponent], imports: [RouterModule,
        AdminModule,
        UiModule,
        RegisterModule,
        //LoginModule,
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
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
        SocialLoginModule,
        GoogleSigninButtonModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: () => localStorage.getItem("accessToken"), //token bilgisi api istekleri için header'a yazdırılıyor.
                allowedDomains: ["localhost:7147"], //güvenlik açığı olmaması için hangi domainlere istek yaparken token header'a koyulacak o belirtiliyor.
            }
        })], providers: [
            { provide: "baseUrl", useValue: "https://localhost:7147/api", multi: true },
            provideHttpClient(withInterceptorsFromDi()),

            // google login ayarlamaları GENÇAY DERS.43
            {
                provide: 'SocialAuthServiceConfig',
                useValue: {
                    autoLogin: false,
                    providers: [{
                        id: GoogleLoginProvider.PROVIDER_ID,
                        provider: new GoogleLoginProvider("426882140911-bt89pttn08vt8menb3vkg7tlh314c6i0.apps.googleusercontent.com")
                    }],
                    onError: err => console.log(err)
                } as SocialAuthServiceConfig
            }
        ]
})
export class AppModule { }
