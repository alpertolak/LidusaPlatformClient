import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ULayoutComponent } from './Ulayout/ulayout.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { uiProfileGuard } from '../guards/common/ui-profile.guard';
import { ChangePasswordComponent } from './components/profile/change-password/change-password.component';
import { AppealToJobComponent } from './components/appeal-to-job/appeal-to-job.component';
import { jobAppealGuard } from '../guards/common/job-appeal.guard';
import { AdvertsComponent } from './components/adverts/adverts.component';
import { AdvertsDetailComponent } from './components/adverts/adverts-detail/adverts-detail.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' }, // Boş rotayı home'a yönlendir
    {
        path: '',
        component: ULayoutComponent,
        children: [
            { path: "home", component: HomeComponent },
            { path: "profile", component: ProfileComponent, canActivate: [uiProfileGuard] },
            { path: "changepassword", component: ChangePasswordComponent, canActivate: [uiProfileGuard] },
            { path: 'adverts', component: AdvertsComponent },
            { path: 'adverts-detail', component: AdvertsDetailComponent },
            { path: 'appeal-to-job', component: AppealToJobComponent, canActivate: [jobAppealGuard] },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UiRoutingModule { }
