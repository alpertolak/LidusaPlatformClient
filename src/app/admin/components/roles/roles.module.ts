import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesComponent } from './roles.component';
import { RouterModule } from '@angular/router';
import { DialogsModule } from 'src/app/dialogs/dialogs.module';
import { FileUploadModule } from 'src/app/services/common/file-upload/file-upload.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { RolesCreateComponent } from './roles-create/roles-create.component';
import { RolesListComponent } from './roles-list/roles-list.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { DeleteDirective } from 'src/app/directives/admin/delete-directive/delete.directive';
import { DeleteDirectiveModule } from 'src/app/directives/admin/delete-directive/delete-directive.module';



@NgModule({
  declarations: [
    RolesComponent,
    RolesCreateComponent,
    RolesListComponent,
  ],
  imports: [
    CommonModule,
    DialogsModule,
    FileUploadModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatPaginator,
    MatTableModule,
    DeleteDirectiveModule,
    // RouterModule.forChild([
    //     { path: "", component: RolesComponent }
    // ]),
]
})
export class RolesModule { }
