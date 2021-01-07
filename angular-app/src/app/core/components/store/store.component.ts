import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/product';
import {Developer} from '../../models/developer';
import {Category} from '../../models/category';
import {ProductService} from "../../services/product/product.service";

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  products: Product[] = [];
  developers: Developer[] = [];
  categories: Category[] = [];

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(products => this.products = products);
  }

}
