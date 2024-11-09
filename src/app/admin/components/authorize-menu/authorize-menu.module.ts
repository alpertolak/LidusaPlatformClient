import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizeMenuComponent } from './authorize-menu.component';
import { RouterModule } from '@angular/router';
import {MatTreeModule} from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';




@NgModule({
  declarations: [
    AuthorizeMenuComponent
  ],
  imports: [
    CommonModule,
    MatTreeModule, 
    MatButtonModule, 
    MatIconModule,
    MatTreeModule,
    RouterModule.forChild([
      { path: "", component: AuthorizeMenuComponent }
    ])
  ]
})
export class AuthorizeMenuModule { }