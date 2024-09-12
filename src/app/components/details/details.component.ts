import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interfaces/product';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
     private readonly _ActivatedRoute = inject(ActivatedRoute);
     private readonly _details = inject(ProductsService);
     private readonly toastr=inject(ToastrService)
     private readonly _CartService = inject(CartService)

     allDetails!:Product;
     addProduct(productId:string){
      this._CartService.addProductToCart(productId).subscribe({
        next:(res)=>{
          this._CartService.cartCounter.next(res.numOfCartItems)
      console.log(res);
        this.toastr.success('Product Added Successfully');
      
      
        },
        error:(err)=>{
      console.log(err);
      
        }
      })
        }
     ngOnInit():void{
      let id:string|null='';
      this._ActivatedRoute.paramMap.subscribe({
        next:(param)=>{
        id= param.get('id'); 
        }
      })
      this._details.getDetails(id).subscribe({
        next:(res)=>{
          this.allDetails=res.data;
          
        },
        error: (error) => {
          console.log(error);
        },
      })
     }
}
