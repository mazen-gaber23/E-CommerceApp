import { Component, OnInit } from '@angular/core';
import { Product } from '../../core/interfaces/product';
import { ProductsService } from '../../core/services/products.service';



@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  allProducts:Product[]= [];
  constructor(private _productsService: ProductsService) { }
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
  ngOnInit(): void {
    this.getProducts()
  }
}

