import { Component, OnInit } from '@angular/core';
import { Category } from '../../core/interfaces/product';
import { CategoriesService } from '../../core/services/categories.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  allCategories:Category[]= [];
  constructor(private _categoriesService: CategoriesService) { }
  getCategories() {
    this._categoriesService.getCategory().subscribe({
      next: (res) => {
        this.allCategories=res.data
         },
      error: (error) => {
        console.log(error);
      },
    });
  };
  ngOnInit(): void {
    this.getCategories()
  }
}


