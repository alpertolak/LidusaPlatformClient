import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectionList } from '@angular/material/list';
import { NgxSpinnerService } from 'ngx-spinner';
import { List_Role } from 'src/app/contracts/roles/list-role';
import { SpinnerType } from 'src/app/Enums/enums';
import { RoleService } from 'src/app/services/common/models/role.service';
import { UserService } from 'src/app/services/common/models/user.service';
import { BaseDialog } from '../base/base-dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-authorize-user-dialog',
  templateUrl: './authorize-user-dialog.component.html',
  styleUrl: './authorize-user-dialog.component.css'
})
export class AuthorizeUserDialogComponent extends BaseDialog<AuthorizeUserDialogComponent> implements OnInit {
  constructor(dialogRef: MatDialogRef<AuthorizeUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roleService: RoleService,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService) {
    super(dialogRef)
  }

  roles: { roles: List_Role[], totalCount: number } = { roles: [], totalCount: 0 };
  assignedRoles: Array<string>
  listRoles: { name: string, selected: boolean }[]
  async ngOnInit() {

    this.spinner.show(SpinnerType.load)
    this.assignedRoles = await this.userService.getRolesToUserAsync(this.data, () => {
      this.spinner.hide(SpinnerType.load)
    },()=>{//errorcallback

    });

    this.roles = await this.roleService.GetRoles(-1, -1);

    this.listRoles = this.roles.roles.map((r: any) => {
      return {
        name: r.name,
        selected: this.assignedRoles?.indexOf(r.name) > -1
      }
    });
  }

  //GENÇAY DRES.66 33:00
  assignRoles(rolesComponent: MatSelectionList) {
    const roles: string[] = rolesComponent.selectedOptions.selected.map(o => o.getLabel().trim());

    this.spinner.show(SpinnerType.save);
    this.userService.assingRoleToUserAsync(this.data, roles,
      () => {
        this.spinner.hide(SpinnerType.save);
        this.toastrService.success("Rol atama işlemi tamamlanmıştır", "Başarılı")
      }, error => {
        this.spinner.hide(SpinnerType.save);
        this.toastrService.error(error, "Hata")
      })
  }
}