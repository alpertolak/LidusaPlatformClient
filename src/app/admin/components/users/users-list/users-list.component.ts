import { Component, HostListener, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ListPaginationUsers } from 'src/app/contracts/users/list-pagination-users';
import { List_Users } from 'src/app/contracts/users/list-users';
import { AuthorizeUserDialogComponent } from 'src/app/dialogs/authorize-user-dialog/authorize-user-dialog.component';
import { SpinnerType } from 'src/app/Enums/enums';
import { DialogService } from 'src/app/services/common/dialog.service';
import { RoleService } from 'src/app/services/common/models/role.service';
import { UserService } from 'src/app/services/common/models/user.service';

declare var $: any
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
    private toastrService: ToastrService,
    private roleService: RoleService
  ) { }

  userDetailId: string;
  roles: any[]
  isFilterUse: boolean = false
  displayedColumns: string[] = ['username', 'name', 'email', 'role', '2FA', 'edit']
  dataSource: MatTableDataSource<List_Users>
  @ViewChild(MatPaginator) paginator: MatPaginator

  async getFilteredUsers(username: string, name: string, email: string, phoneNumber: string, roleIndex: number) {

    //hiçbir filtre yapılmadan butona basılırsa 
    if (username == "" && name == "" && email == "" && phoneNumber == "" && roleIndex == 0) {
      this.isFilterUse = false
      this.getAllUsers()
    }
    else {
      this.isFilterUse = true
      //sorguyu yapacak servis çağırılıyor
      this.spinner.show(SpinnerType.load)
      var roleId = roleIndex > 0 ? this.roles[roleIndex - 1].id : ""
      //TODO page ve size bilgilerini verek gelen verileri sayfala, api falan ayarla hep
      const filteredUsers: ListPaginationUsers = await this.userService.getFilteredUsersAsync(username, name, email, phoneNumber, roleId, this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, () => {
        this.spinner.hide(SpinnerType.load) //successcallback
      }, (error) => {
        this.spinner.hide(SpinnerType.load) //errorcallback
        this.toastrService.error(error, "Hata")
      })
      this.setUsersToTable(filteredUsers)

    }
  }

  async getAllUsers() {
    this.spinner.show(SpinnerType.load)
    const allUsers: ListPaginationUsers = await this.userService.getAllUsersAsync(
      this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5,
      () => { //successCallBack
        this.spinner.hide(SpinnerType.load)
      }, () => { //errorCallBack
        this.spinner.hide(SpinnerType.load)
      })
    //gelen kullanıcılar tabloya yazdırılıyor
    this.setUsersToTable(allUsers);
    this.isFilterUse = false;
  }

  //temizle butonu filtreyi temizler ve bütün kullanıcıları listeler
  clearFilter() {
    $("#Username").val("");
    $("#Name").val("");
    $("#Email").val("");
    $("#PhoneNumber").val("");
    $("#Role").val("Rol Seçin");
    this.getAllUsers();
  }

  //ESC tuşuna basılınca filtreyi sıfırlar
  @HostListener('document:keydown.escape', ['$event'])
  handleEscape(event: KeyboardEvent) {
    if(this.isFilterUse) this.clearFilter()
  }

  //tablo üzerinden sayfalama elemanı seçildiğinde bu fonksiyon tetiklenir
  async pageChanged(username: string, name: string, email: string, phoneNumber: string, roleIndex: number) {

    //filtre bilgileri varsa ve sayfalama isteniyorsa
    if (this.isFilterUse) await this.getFilteredUsers(username, name, email, phoneNumber, roleIndex)

    //filte yoksa bütün kullanıcılar listelenir
    else await this.getAllUsers()
  }
  async ngOnInit() {
    await this.getAllUsers()

    //api'den gelen rol bilgileri roles değişkenine atanıyor
    const _roles = await (this.roleService.GetRoles(-1, -1));
    this.roles = _roles.roles
  }

  setUsersToTable(users: ListPaginationUsers) {
    this.dataSource = new MatTableDataSource<List_Users>(users.users)
    this.paginator.length = users.totalUsersCount
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
