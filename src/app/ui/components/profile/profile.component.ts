import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/entities/User';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getUser()
  }

  user: User;
  userıd: string = localStorage.getItem('UserId') as string
  isEditTable: boolean = false

  async getUser() {
    var data: any = await this.userService.getUserByIdOrUsernameOrEmailAsync(this.userıd)
    this.user = data.user
  }

  toggleEditTable() {
    this.isEditTable = !this.isEditTable
  }

  SubmitForm() {
    //kabaca tasarlandı gerçekleştirilecek işlemler burada yapılacak
    this.toastrService.success('Profiliniz başarıyla güncellendi', 'Başarılı')
    this.isEditTable = false
  }
}
