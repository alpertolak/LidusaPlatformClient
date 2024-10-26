import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { List_Role } from 'src/app/contracts/roles/list-role';
import { ListRolePagination } from 'src/app/contracts/roles/list-roles-pagination';
import { SpinnerType } from 'src/app/Enums/enums';
import { RoleService } from 'src/app/services/common/models/role.service';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrl: './roles-list.component.css'
})
export class RolesListComponent {

  constructor(
    private roleService: RoleService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }

  displayedColumns: string[] = ['Role', "Edit", "Delete"];
  dataSource: MatTableDataSource<List_Role>
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getRoles() {
    this.spinner.show(SpinnerType.load)
    debugger
    const allRoles: ListRolePagination = await this.roleService.GetRoles(
      this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5,
      () => { //successCallBack
        this.spinner.hide(SpinnerType.load)
      }, () => { //errorCallBack
        this.spinner.hide(SpinnerType.load)
      })
    
    this.dataSource = new MatTableDataSource<List_Role>(allRoles.roles)
    this.paginator.length = allRoles.totalCount
  }
  async pageChanged() {
    await this.getRoles()
  }
  async ngOnInit() {
    await this.getRoles()
  }

}
