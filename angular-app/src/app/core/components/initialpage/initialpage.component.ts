import { Component, OnInit, AfterViewInit } from '@angular/core';
import {Product} from '../../models/product';
import {ProductService} from '../../services/product/product.service';
import {DynamicScriptLoaderService} from '../../services/scripts/dynamic-script-loader-service.service';

@Component({
  selector: 'app-initialpage',
  templateUrl: './initialpage.component.html',
  styleUrls: ['./initialpage.component.css'],
})
export class InitialpageComponent implements OnInit, AfterViewInit {

  topProducts: Product[] = [];
  newProducts: Product[] = [];
  selected = 0;

  constructor(private productService: ProductService, private dynamicScriptLoader: DynamicScriptLoaderService) {

  }

  ngOnInit(): void {
    this.getTopProducts();
    this.getNewProducts();
  }

  ngAfterViewInit(): void {
    this.loadScripts();
  }

  changeSelect(selected: number): void{
    this.selected = selected;
  }


  getTopProducts(): void {
    this.productService.getTopProducts().subscribe(products => this.topProducts = products);
  }

  getNewProducts(): void {
    this.productService.getNewProducts().subscribe(products => this.newProducts = products);
  }

  private loadScripts(): void {
    this.dynamicScriptLoader.loadAll().then(data => {
    }).catch(error => console.log(error));
  }

}
