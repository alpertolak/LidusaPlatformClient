import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsComponent } from './jobs.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { JobsCreateComponent } from './jobs-create/jobs-create.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    JobsComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    JobsCreateComponent, //component import ediliyor çünkü standalone özelliği true
    JobsListComponent,
    RouterModule.forChild([
      { path: "", component: JobsComponent }
    ])

  ]
})
export class JobsModule { }
