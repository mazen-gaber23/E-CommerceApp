import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../core/interfaces/product';
import { ProductsService } from '../../core/services/products.service';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { SoldOutPipe } from '../../core/pipes/sold-out.pipe';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink,CurrencyPipe,SoldOutPipe,SearchPipe,FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  wishlistStatus: { [key: string]: boolean } = {};
  term:string=''
  allProducts:Product[]= [];
  constructor(private _productsService: ProductsService) { }
  private readonly _CartService = inject(CartService)
  private readonly toastr = inject(ToastrService);
  private readonly _WishlistService = inject(WishlistService);



  getProducts() {
    this._productsService.getproducts().subscribe({
      next: (res) => {
        this.allProducts=res.data   
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
      addWishlist(productId:string) {
        this._WishlistService.addProductToWishlist(productId).subscribe({
          next: (res) => {
            this._WishlistService.wishlistCounter.next(res.data.length)
            console.log(res);
            this.wishlistStatus[productId]=true;
            this.toastr.success('Product Added In Wichlist Successfully');
             },
          error: (error) => {
            console.log(error);
          },
        });
      };
  ngOnInit(): void {
    this.getProducts()
  }
}

