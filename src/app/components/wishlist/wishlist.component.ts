import { Component, inject } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { Wishlist } from '../../core/interfaces/wishlist'; // Corrected import
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {
  isLoading = false;
  wishlist!: Wishlist; 
  private readonly _WishlistService = inject(WishlistService);
  private readonly toastr = inject(ToastrService);
  private readonly _CartService = inject(CartService)


  getWishlistProducts() {
    this._WishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {        
        this.wishlist = res;
        this.isLoading = true;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  removeProductFromWishlist(productId:string) {
    this._WishlistService.removeProductFromWishlist(productId).subscribe({
      next: (res) => {    
        this._WishlistService.wishlistCounter.next(res.data.length)
    
        console.log(res);
        this.toastr.success('Product Removed From Wichlist Successfully');
        this.getWishlistProducts()
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  addProduct(productId:string){
    this._CartService.addProductToCart(productId).subscribe({
      next:(res)=>{
    console.log(res);
      this.toastr.success('Product Added Successfully');
    
    
      },
      error:(err)=>{
    console.log(err);
    
      }
    })
      }

  ngOnInit(): void {
    this.getWishlistProducts();
  }
}
