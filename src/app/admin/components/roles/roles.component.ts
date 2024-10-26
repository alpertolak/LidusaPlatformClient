import { Component, ViewChild } from '@angular/core';
import { RolesListComponent } from './roles-list/roles-list.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent {

  @ViewChild(RolesListComponent) roleListComponent: RolesListComponent

  createdRole(createdRole: any) {
    this.roleListComponent.getRoles()
  }
}
