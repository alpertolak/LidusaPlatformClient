import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogService } from 'src/app/services/common/dialog.service';
import { ApplicationService } from 'src/app/services/common/models/application.service';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { AuthorizeMenuDialogComponent } from 'src/app/dialogs/authorize-menu-dialog/authorize-menu-dialog.component';

interface ITreeMenu {
  name?: string,
  actions?: ITreeMenu[],
  code?: string,
  menuName?: string
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  code: string;
  menuName: string;
}

@Component({
  selector: 'app-authorize-menu',
  templateUrl: './authorize-menu.component.html',
  styleUrl: './authorize-menu.component.css',

})

//GENÇAY DERS.64
export class AuthorizeMenuComponent implements OnInit {

  constructor(
    private spinner: NgxSpinnerService,
    private applicationService: ApplicationService,
    private dialogService: DialogService) { }

  async ngOnInit() {
    this.dataSource.data = (await this.applicationService.getAuthorizeDefinitionEndpoints())
    .map(m => {
      const treeMenu: ITreeMenu = {
        name: m.name,
        actions: m.actions.map(a => {
          const _treeMenu: ITreeMenu = {
            name: a.definition,
            code: a.code,
            menuName: m.name
          }
          return _treeMenu;
        })
      };
      return treeMenu;
    });
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  )

  treeFlattener = new MatTreeFlattener(
    (menu: ITreeMenu, level: number) => {
      return {
        expandable: (menu.actions?.length || 0) > 0, // `expandable` alanını boolean olarak tanımladık
        name: menu.name || "", // `name` undefined olursa boş string kullanıyoruz
        level: level,
        code: menu.code || "",
        menuName: menu.menuName || ""
      };
    },
    menu => menu.level,
    menu => menu.expandable,
    menu => menu.actions || []
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  assignRole(code: string, name: string, menuName: string) {
    this.dialogService.openDialog({
      componentType: AuthorizeMenuDialogComponent,
      data: { code: code, name: name, menuName: menuName },
      options: {
        width: "750px"
      }, afterClose: () => {

      }
    });
  }
}