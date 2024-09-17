import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { userCreate } from 'src/app/entities/UserCreate';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

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
      phoneNumber: ["", [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
      ]],
      password: ["", [
        Validators.required,
        Validators.minLength(3)
      ]],
      rePassword: ["", [
        Validators.required
      ]]
    }, {
      //şifre karşılaştırma işlemi GENÇAY 37.DERS
      validators: (group: AbstractControl): ValidationErrors | null => {
        let password = group.get("password")?.value
        let rePassword = group.get("rePassword")?.value
        return password == rePassword ? null : { notSame: true }
      }
    })
  }

  get component() {
    return this.frm.controls
  }

  submitted: boolean = false

  onSubmit(data: userCreate) {
    this.submitted = true
    debugger
    if (this.frm.invalid) return
    console.log("hatasız")
  }
}
