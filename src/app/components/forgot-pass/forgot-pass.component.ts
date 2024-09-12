import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertErrorComponent } from '../../shared/ui/alert-error/alert-error.component';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forgot-pass',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule, AlertErrorComponent,NgClass],
  templateUrl: './forgot-pass.component.html',
  styleUrl: './forgot-pass.component.scss'
})
export class ForgotPassComponent {
  erorr!:string
  isBtnSubmit:boolean=false;
  step:any=1;
  myEmail!:string;
  private readonly _AuthService= inject(AuthService)
  private readonly _Router= inject(Router)
forgotPassword:FormGroup = new FormGroup({
  email:new FormControl(null,[Validators.required,Validators.email]),
})
verifyResetCode:FormGroup = new FormGroup({
  resetCode:new FormControl(null,[Validators.required]),
})
resetPassword:FormGroup = new FormGroup({
  email:new FormControl(null,[Validators.required]),
  newPassword:new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)])
})
submitStep1(){
  this.isBtnSubmit=true;
  this.myEmail=this.forgotPassword.get('email')?.value;
  this.resetPassword.get('email')?.setValue(this.myEmail);
  if(this.forgotPassword.valid){
    this._AuthService.forgotPasswords(this.forgotPassword.value).subscribe({
      next:(res)=>{
      this.step=2;   
      localStorage.setItem('currentStep',this.step.toString());
      localStorage.setItem('currentEmail',this.myEmail);
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
submitStep2(){
  this.isBtnSubmit=true;
  if(this.verifyResetCode.valid){
    this._AuthService.verifyResetCode(this.verifyResetCode.value).subscribe({
      next:(res)=>{
      this.step=3; 
      localStorage.setItem('currentStep',this.step.toString())  
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
submitStep3(){
  this.isBtnSubmit=true;
  if(this.resetPassword.valid){
    this._AuthService.resetPassword(this.resetPassword.value).subscribe({
      next:(res)=>{
      this.step=3;   
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
ngOnInit(): void{
     this.step=localStorage.getItem('currentStep')||1;
     this.resetPassword.get('email')?.setValue(localStorage.getItem('currentEmail'));
}
}
