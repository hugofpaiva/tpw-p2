import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../../services/product/product.service';
import {Product} from '../../../models/product';

@Component({
  selector: 'app-adminapps',
  templateUrl: './adminapps.component.html',
  styleUrls: ['./adminapps.component.css']
})
export class AdminappsComponent implements OnInit {

  products: Product[] = [];
  p: number = Number(1);

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(products => this.products = products);
  }

}
