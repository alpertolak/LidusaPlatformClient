import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UsersListComponent } from './users-list/users-list.component';
import { RouterModule } from '@angular/router';
import { DialogsModule } from 'src/app/dialogs/dialogs.module';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { UsersFilterComponent } from "./users-filter/users-filter.component";


@NgModule({
  declarations: [
    UsersComponent,
    UsersListComponent,
    UsersFilterComponent,
  ],
  imports: [
    DialogsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    CommonModule,
    MatFormFieldModule,
    RouterModule.forChild([
        { path: "", component: UsersComponent }
    ]),
]
})
export class UsersModule { }
