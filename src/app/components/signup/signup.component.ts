import { Component } from '@angular/core';
import { ButtonComponent } from "../../shared/ui/button/button.component";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertErrorComponent } from "../../shared/ui/alert-error/alert-error.component";
import { confirmPassword } from '../../shared/utils/confirm-pass.utils';
import { signupValidators } from '../../shared/utils/register.validators';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule, AlertErrorComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
register:FormGroup = new FormGroup({
  name:new FormControl(null,signupValidators.name),
  email:new FormControl(null,signupValidators.email),
  password:new FormControl(null,signupValidators.password),
  rePassword:new FormControl(null),
},confirmPassword)

sendData(){
  if(this.register.valid){
    console.log(this.register);
  }
}
}
