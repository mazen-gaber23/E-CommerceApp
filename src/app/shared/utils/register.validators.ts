import { Validators } from "@angular/forms";

export const signupValidators={
    name: [Validators.required,Validators.minLength(2),Validators.maxLength(20)],
    email:[Validators.required,Validators.email],
    password:[Validators.required,Validators.pattern(/^[A-Za-z\d]{8,}$/)],
}