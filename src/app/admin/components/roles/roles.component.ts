import { Component, OnInit, ViewChild } from '@angular/core';
import { RolesListComponent } from './roles-list/roles-list.component';
import { Create_Role } from 'src/app/contracts/roles/create-role';
import { AuthorizationEndpointService } from 'src/app/services/common/models/authorization-endpoint.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit {

  constructor(private authorizationEndpointService:AuthorizationEndpointService){
    
  }
  ngOnInit(): void {
    //TODO role ile endpoint eşleştirmesi için yaptığımız istek
    // const roles :string[] = ["Admin"]
    // this.authorizationEndpointService.assignRoleEndpoint(roles,"GET.Reading.GetJobs","Jobs")
  }



  @ViewChild(RolesListComponent) rolesListComponent: RolesListComponent
  createdRole() {
    console.log(this.rolesListComponent.getRoles())
  }
}
