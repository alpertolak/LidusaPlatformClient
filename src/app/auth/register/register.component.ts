import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Create_User } from 'src/app/contracts/users/create-user';
import { User } from 'src/app/entities/User';
import { SpinnerType } from 'src/app/Enums/enums';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: ToastrService,
    private spinnerService : NgxSpinnerService,
    private router: Router,
  ) { }

  frm: FormGroup
  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      name: ["", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ]],
      lastName: ["", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ]],
      gender: ["", [
        Validators.required
      ]],
      userName: ["", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ]],
      email: ["", [
        Validators.required,
        Validators.email,
        Validators.maxLength(50)
      ]],
      phoneNumber: ['', [
        Validators.required, 
        Validators.pattern("^[0-9]*$"), 
        Validators.minLength(10), 
        Validators.maxLength(10)]],
      password: ["", [
        Validators.required,
        Validators.minLength(3)
      ]],
      passwordConfirm: ["", [
        Validators.required
      ]]
    }, {
      //şifre karşılaştırma işlemi GENÇAY 37.DERS
      validators: (group: AbstractControl): ValidationErrors | null => {
        let password = group.get("password")?.value
        let rePassword = group.get("passwordConfirm")?.value
        return password == rePassword ? null : { notSame: true }
      }
    })
  }

  get component() {
    return this.frm.controls
  }

  submitted: boolean = false
  async onSubmit(user: User) {
    debugger

    this.spinnerService.show(SpinnerType.load)
    this.submitted = true
    if (this.frm.invalid){
      this.spinnerService.hide(SpinnerType.load)
      return //form üzerinde herhangi bir hata varsa return ederek kayıt işlemini iptal eder
    } 

    const result: any = await this.userService.createUserAsync(user)

    if (result.succeeded) {
      this.toastrService.success(result.message, "Başarılı")
      this.spinnerService.hide(SpinnerType.load)
      this.router.navigate(["auth/login"])
    }else{
      this.toastrService.error(result.message,"Hata")
      this.spinnerService.hide(SpinnerType.load)
    }
  }
}
