import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ULayoutComponent } from './Ulayout/ulayout.component';

const routes: Routes = [
    {
        path: '',
        component: ULayoutComponent,
        children: [
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UiRoutingModule { }
