import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ULayoutComponent } from './Ulayout/ulayout.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' }, // Boş rotayı home'a yönlendir
    {
        path: '',
        component: ULayoutComponent,
        children: [
            { path: "home", component: HomeComponent },
            { path: "profile", component: ProfileComponent }
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UiRoutingModule { }
