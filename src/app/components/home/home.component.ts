import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interfaces/product';
import { AuthService } from '../../core/services/auth.service';
import { SliderBannerComponent } from "../slider-banner/slider-banner.component";
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';
import { CurrencyPipe } from '@angular/common';
import { SoldOutPipe } from '../../core/pipes/sold-out.pipe';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SliderBannerComponent,RouterLink,CurrencyPipe,SoldOutPipe,SearchPipe,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  cancelSubscription:Subscription=new Subscription
  term:string=''
  wishlistStatus: { [key: string]: boolean } = {};
  allProducts:Product[]= [];
  constructor(private _productsService: ProductsService,private _token:AuthService) {
    this._token.saveUserData()
   }
   private readonly _CartService = inject(CartService)
   private readonly toastr=inject(ToastrService)
   private readonly _WishlistService = inject(WishlistService);
  getProducts() {
    this.cancelSubscription=this._productsService.getproducts().subscribe({
      next: (res) => {
        this.allProducts=res.data   
         },
      error: (error) => {
        console.log(error);
      },
    });
  };
  addWishlist(productId:string) {
    this._WishlistService.addProductToWishlist(productId).subscribe({
      next: (res) => {
        this._WishlistService.wishlistCounter.next(res.data.length)
        console.log(res);
        this.toastr.success('Product Added In Wichlist Successfully');
        this.wishlistStatus[productId]=true;
         },
      error: (error) => {
        console.log(error);
      },
    });
  };
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
  ngOnInit(): void {
    this.getProducts()
  }
  ngOnDestroy(): void {
    this.cancelSubscription.unsubscribe()
  }
}

