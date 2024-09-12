import { Component, inject } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Cart } from '../../core/interfaces/cart';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  isLoading:boolean=false
  cart!:Cart;
  private readonly toastr=inject(ToastrService)
private readonly _CartService=inject(CartService)
getLoggedUserCart(){
this._CartService.getLoggedUserCart().subscribe({
  next:(res)=>{
    console.log(res); 
    this.cart=res 
    this.isLoading=true;  
      },
      error:(err)=>{
    console.log(err);
    
      }
})
}
removeItem(productId:string){
  this._CartService.removeItem(productId).subscribe({
    next:(res)=>{
      this._CartService.cartCounter.next(res.numOfCartItems)
      console.log(res); 
      this.toastr.success('Product Removed Successfully');
      this.getLoggedUserCart();

        },
        error:(err)=>{
      console.log(err);
      
        }
  })
  }
  updateProductQuantity(productId:string,count:number){
this._CartService.updateProductQuantity(productId,count).subscribe({
  next:(res)=>{
    console.log(res); 
    this.toastr.success('Product Updated Successfully');
    this.getLoggedUserCart();
      },
      error:(err)=>{
    console.log(err);
    
      }
})

  }
ngOnInit():void{
this.getLoggedUserCart();
}
}
