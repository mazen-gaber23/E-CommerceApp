import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../environment/environment.local';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _HttpClient:HttpClient) { }
  getproducts():Observable<any>{
    return this._HttpClient.get(baseUrl+'/api/v1/products')
  }
  getDetails(id:string):Observable<any>{
    return this._HttpClient.get(baseUrl+`/api/v1/products/${id}`)
  }
}
