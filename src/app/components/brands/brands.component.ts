import { Component, OnInit } from '@angular/core';
import { Brand } from '../../core/interfaces/product';
import { BrandsService } from '../../core/services/brands.service';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {
  allBrands:Brand[]= [];
  constructor(private _brandsService: BrandsService) { }
  getBrands() {
    this._brandsService.getBrands().subscribe({
      next: (res) => {
        this.allBrands=res.data
         },
      error: (error) => {
        console.log(error);
      },
    });
  };
  ngOnInit(): void {
    this.getBrands()
  }
}