import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/product';
import {ProductService} from '../../services/product/product.service';
import {DynamicScriptLoaderService} from '../../services/scripts/dynamic-script-loader-service.service';

@Component({
  selector: 'app-initialpage',
  templateUrl: './initialpage.component.html',
  styleUrls: ['./initialpage.component.css']
})
export class InitialpageComponent implements OnInit {

  topProducts: Product[] = [];
  newProducts: Product[] = [];

  constructor(private productService: ProductService, private dynamicScriptLoader: DynamicScriptLoaderService) {

  }

  ngOnInit(): void {
    this.getProducts();
    this.loadScripts();
  }

  getProducts(): void {
    this.productService.getTopProducts().subscribe(products => { this.topProducts = products; console.log(this.topProducts);});
    this.productService.getNewProducts().subscribe(products => { this.newProducts = products; console.log(this.newProducts);});
  }

  private loadScripts(): void {
    this.dynamicScriptLoader.loadAll().then(data => {
    }).catch(error => console.log(error));
  }

}
