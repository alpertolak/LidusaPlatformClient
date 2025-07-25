import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.module.routing';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AdminModule } from './admin/admin.module';
import { UiModule } from './ui/ui.module';
import { RegisterModule } from './auth/register/register.module';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { LoginComponent } from './auth/login/login.component';
import { GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpErrorHandlerInterceptorService } from './services/common/http-error-handler-interceptor.service';
import { PasswordResetModule } from './auth/password-reset/password-reset.module';
import { PasswordUpdateModule } from './auth/password-update/password-update.module';


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
    ],
    bootstrap: [AppComponent], imports: [
        RouterModule,
        AdminModule,
        UiModule,
        RegisterModule,
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        PasswordResetModule,
        PasswordUpdateModule,
        ToastrModule.forRoot({
            timeOut: 5000,
            positionClass: 'toast-top-right',
            preventDuplicates: true,
            closeButton: true,
            progressBar: true,
            enableHtml: true,
            countDuplicates: true,
        }),
        BrowserAnimationsModule,
        NgxSpinnerModule,
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
            },
            //GENÇAY DERS.46
            { provide: HTTP_INTERCEPTORS, useClass: HttpErrorHandlerInterceptorService, multi: true }
        ]
})
export class AppModule { }
