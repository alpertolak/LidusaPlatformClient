import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ListPaginationUsers } from 'src/app/contracts/users/list-pagination-users';
import { List_Users } from 'src/app/contracts/users/list-users';
import { AuthorizeUserDialogComponent } from 'src/app/dialogs/authorize-user-dialog/authorize-user-dialog.component';
import { SpinnerType } from 'src/app/Enums/enums';
import { DialogService } from 'src/app/services/common/dialog.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {

  constructor(
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private dialogService: DialogService,
    private toastrService:ToastrService,
  ) { }

  displayedColumns: string[] = ['username', 'name', 'email', 'role', '2FA', 'edit'];
  dataSource: MatTableDataSource<List_Users>
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getUsers() {
    this.spinner.show(SpinnerType.load)
    const allUsers: ListPaginationUsers = await this.userService.getAllUsers(
      this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5,
      () => { //successCallBack
        this.spinner.hide(SpinnerType.load)
      }, () => { //errorCallBack
        this.spinner.hide(SpinnerType.load)
      })
    this.dataSource = new MatTableDataSource<List_Users>(allUsers.users)
    this.paginator.length = allUsers.totalUsersCount
  }
  async pageChanged() {
    await this.getUsers()
  }
  async ngOnInit() {
    await this.getUsers()
  }
  async assingRole(Id: string) {
    this.dialogService.openDialog({
      componentType: AuthorizeUserDialogComponent,
      data: Id,
      options: {
        width: "750px"
      },
    })
  }
}
