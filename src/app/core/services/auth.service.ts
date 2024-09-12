import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../environment/environment.local';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _Router= inject(Router)

  constructor(private _HttpClient:HttpClient) { }
  signup(user:any):Observable<any>{
    return this._HttpClient.post(baseUrl+'/api/v1/auth/signup',user)
    
  }
  signin(user:any):Observable<any>{
    return this._HttpClient.post(baseUrl+'/api/v1/auth/signin',user)
  }
  saveUserData(){
    let token= localStorage.getItem('token')
    if(token){
      try{
          let decoded=jwtDecode(token);
      }
      catch{
        this._Router.navigate(['signin']);
        localStorage.clear();
      }
    }
  }
  forgotPasswords(email:any):Observable<any>{
    return this._HttpClient.post(baseUrl+'/api/v1/auth/forgotPasswords',email)
  }
  verifyResetCode(code:any):Observable<any>{
    return this._HttpClient.post(baseUrl+'/api/v1/auth/verifyResetCode',code)
  }
  resetPassword(newPass:any):Observable<any>{
    return this._HttpClient.put(baseUrl+'/api/v1/auth/resetPassword',newPass)
  }
}
