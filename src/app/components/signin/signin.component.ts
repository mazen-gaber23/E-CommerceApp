import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AlertErrorComponent } from '../../shared/ui/alert-error/alert-error.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { signupValidators } from '../../shared/utils/register.validators';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule, AlertErrorComponent,NgClass,RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  erorr!:string
  isBtnSubmit:boolean=false;
  private readonly _AuthService= inject(AuthService)
  private readonly _Router= inject(Router)
login:FormGroup = new FormGroup({
  email:new FormControl(null,signupValidators.email),
  password:new FormControl(null,signupValidators.password),
})

sendData(){
  this.isBtnSubmit=true;
  if(this.login.valid){
    this._AuthService.signin(this.login.value).subscribe({
      next:(res)=>{
        localStorage.setItem('token',res.token);
        this._AuthService.saveUserData();
        this._Router.navigate(['/home']);
this.isBtnSubmit=false
        console.log(res);
      },
      error:(err:HttpErrorResponse)=>{
        this.isBtnSubmit=false
                console.log(err);
                this.erorr=err.error.message;
              },
      
    })
}
}
}
