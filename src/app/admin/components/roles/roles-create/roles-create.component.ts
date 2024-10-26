import { Component, EventEmitter, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
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

  @Output() createdRoles: EventEmitter<string> = new EventEmitter()


  CreateRole(roleName: string) {

    this.spinner.show(SpinnerType.save)
    this.roleService.CreateRole(roleName, () => {

      this.spinner.hide(SpinnerType.save)
      this.toastrService.success("Role Başarıyla kaydedilmiştir.", "Başarılı")
      this.createdRoles.emit(roleName.toString())
    }, errorMessage => {
      this.spinner.hide(SpinnerType.save)
      console.log(errorMessage.toString())
      this.toastrService.error(errorMessage.toString(), "Hata")
    })
  }
}
