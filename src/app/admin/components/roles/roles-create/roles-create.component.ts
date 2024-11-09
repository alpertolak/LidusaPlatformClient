import { Component, EventEmitter, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Create_Role } from 'src/app/contracts/roles/create-role';
import { SpinnerType } from 'src/app/Enums/enums';
import { JobService } from 'src/app/services/common/jobs/job.service';
import { RoleService } from 'src/app/services/common/models/role.service';

@Component({
  selector: 'app-roles-create',
  templateUrl: './roles-create.component.html',
  styleUrl: './roles-create.component.css'
})
export class RolesCreateComponent {

  constructor(
    private roleService:RoleService,
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService) { }

  @Output() createdRoles: EventEmitter<Create_Role> = new EventEmitter()


  CreateRole(name: string) {
    const newRole: Create_Role = new Create_Role()
    newRole.name = name

    this.spinner.show(SpinnerType.save)
    this.roleService.CreateRole(newRole, () => {
      this.spinner.hide(SpinnerType.save)
      this.toastrService.success("Role Başarıyla kaydedilmiştir.", "Başarılı")
      this.createdRoles.emit(newRole)
    }, errorMessage => {
      this.spinner.hide(SpinnerType.save)
      console.log(errorMessage.toString())
      this.toastrService.error(errorMessage.toString(), "Hata")
    })
  }
}
