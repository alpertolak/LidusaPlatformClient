import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthorizeUserDialogComponent } from 'src/app/dialogs/authorize-user-dialog/authorize-user-dialog.component';
import { User } from 'src/app/entities/User';
import { SpinnerType } from 'src/app/Enums/enums';
import { DialogService } from 'src/app/services/common/dialog.service';
import { UserService } from 'src/app/services/common/models/user.service';

declare var $:any
@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrl: './users-detail.component.css'
})
export class UsersDetailComponent implements AfterViewInit {

  //listeleme sayfasından gelen userId
  @Input() UserId!: string;

  user: User = new User // kullanıcının bilgilerini tutan değişken

  //boolean değişkenler tanımlanıyor
  isAdminChecked: boolean
  isTwoFactorChecked: boolean

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService,
    private dialogService: DialogService
  ) { }
  
  onSubmit(username: string, name: string, lastName: string, email: string, phoneNumber: string) {

    this.spinner.show(SpinnerType.save)

    //kullanıcın yeni bilgileri kayıt ediliyor
    const user: User = new User
    user.id = this.UserId
    user.userName = username
    user.name = name
    user.lastName = lastName
    user.email = email
    user.phoneNumber = phoneNumber
    user.isAdmin = this.isAdminChecked
    user.twoFactorEnabled = this.isTwoFactorChecked
    
    this.userService.UpdateUserAsync(user, () => {
      this.spinner.hide(SpinnerType.save)
      this.toastrService.success("kullanıcı bilgileri güncellenmiştir")
      this.closeModal()
    }, errorMessage => {
      this.spinner.hide(SpinnerType.save)
      this.toastrService.error(errorMessage?.toString(), "Hata")
    })
  }

  closeModal(): void {
    $('#UserDetailModal').modal('hide'); // Modal'ı kapatır
  }

  ngAfterViewInit() {
    // Modal açıldığında çalışacak olay
    const modal = document.getElementById('UserDetailModal');
    if (modal) {
      modal.addEventListener('shown.bs.modal', () => {
        this.onModalOpen();
      })
      modal.addEventListener('hidden.bs.modal', () => {
        this.onModalClose()
      })
    }
  }

  async onModalOpen() {
    //gelen kullanıcı verisi iç içe olduğu için ayılanarak user değişkenine atanıyor
    var data: any = await this.userService.getUserByIdOrUsernameAsync(this.UserId)
    this.user = data.user as User
    this.isAdminChecked = data.user.isAdmin as boolean
    this.isTwoFactorChecked = data.user.twoFactorEnabled as boolean
  }

  async onModalClose() {
    //modal kapatıldıktan sonra user bilgisi siliniyor
    this.user = new User
  }
}
