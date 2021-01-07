import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/product';
import {Developer} from '../../models/developer';
import {Category} from '../../models/category';
import {ProductService} from '../../services/product/product.service';
import {CategoryService} from '../../services/category/category.service';
import {DeveloperService} from '../../services/developer/developer.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  products: Product[] = [];
  developers: Developer[] = [];
  categories: Category[] = [];

  constructor(private productService: ProductService, private categoryService: CategoryService, private developerService: DeveloperService) {
  }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
    this.getDevelopers();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(products => this.products = products);
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
  }

  getDevelopers(): void {
    this.developerService.getDevelopers().subscribe(developers => this.developers = developers);
  }

}
