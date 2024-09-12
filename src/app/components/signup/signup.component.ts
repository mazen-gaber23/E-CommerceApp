import { Component, inject } from '@angular/core';
import { ButtonComponent } from "../../shared/ui/button/button.component";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertErrorComponent } from "../../shared/ui/alert-error/alert-error.component";
import { confirmPassword } from '../../shared/utils/confirm-pass.utils';
import { signupValidators } from '../../shared/utils/register.validators';
import { NgClass } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule, AlertErrorComponent,NgClass],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  erorr!:string
  isBtnSubmit:boolean=false;
  private readonly _AuthService= inject(AuthService)
  private readonly _Router= inject(Router)
register:FormGroup = new FormGroup({
  name:new FormControl(null,signupValidators.name),
  email:new FormControl(null,signupValidators.email),
  password:new FormControl(null,signupValidators.password),
  rePassword:new FormControl(null),
},confirmPassword)

sendData(){
  this.isBtnSubmit=true;
  if(this.register.valid){
    this._AuthService.signup(this.register.value).subscribe({
      next:(res)=>{
        this._Router.navigate(['/signin'])
this.isBtnSubmit=false
        console.log(res);
      },
      error:(err:HttpErrorResponse)=>{
        this.isBtnSubmit=false
                console.log(err);
                this.erorr=err.error.message
              },
      
    })
}
}
}
