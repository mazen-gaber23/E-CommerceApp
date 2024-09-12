import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../core/services/translation.service';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  counter1:number=0
  counter2:number=0
private readonly _TranslationService=inject(TranslationService)
readonly _TranslateService=inject(TranslateService)
private readonly _CartService=inject(CartService)
private readonly _WishlistService=inject(WishlistService)
private readonly _Router=inject(Router)

logOut(){
  localStorage.removeItem('token');
  this._Router.navigate(['signin'])
}
getLoggedUserCart(){
  this._CartService.getLoggedUserCart().subscribe({
    next:(res)=>{
      console.log(res); 
      this._CartService.cartCounter.next(res.numOfCartItems)
        },
        error:(err)=>{
      console.log(err);
      
        }
  })
  }
  getWishlistProducts() {
    this._WishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {        
        this._WishlistService.wishlistCounter.next(res.data.length)
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
ngOnInit():void{
  this.getWishlistProducts()
  this.getLoggedUserCart()
  this._TranslationService.changeDirection()
  this._CartService.cartCounter.subscribe({
    next:(counter)=>{
        this.counter1=counter
    }
  })
  this._WishlistService.wishlistCounter.subscribe({
    next:(counter)=>{
        this.counter2=counter
    }
  })
}
selectLang(lang:string){
  this._TranslationService.changeLang(lang)
}

}
