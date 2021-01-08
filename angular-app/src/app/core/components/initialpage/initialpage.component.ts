import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/product';
import {ProductService} from '../../services/product/product.service';

@Component({
  selector: 'app-initialpage',
  templateUrl: './initialpage.component.html',
  styleUrls: ['./initialpage.component.css']
})
export class InitialpageComponent implements OnInit {

  products: Product[] = [];
  productsBanner: Product[] = [];

  constructor(private productService: ProductService) {

  }

  ngOnInit(): void {
    this.getProducts();
    this.getProductsBanner();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(products => this.products = products);
    // console.log(this.products.length);
  }

  getProductsBanner(): void {
    const max = Math.floor(Math.random() * (6 - 2 + 1)) + 2;

    for ( const x of [].constructor(max)){
      const index = Math.random() * (this.products.length - 1 - 0 + 1) + 0;
      console.log(this.products.length);
      const prod: Product = this.products[index];
      if (!this.productsBanner.includes(prod)){
        console.log('ok');
        this.productsBanner.push(prod);
        console.log(prod);
      }

    }
  }

}
