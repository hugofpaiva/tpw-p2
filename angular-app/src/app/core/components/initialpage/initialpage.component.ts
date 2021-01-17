import { Component, OnInit, AfterViewInit } from '@angular/core';
import {Product} from '../../models/product';
import {ProductService} from '../../services/product/product.service';
import {DynamicScriptLoaderService} from '../../services/scripts/dynamic-script-loader-service.service';
import {OwlOptions} from 'ngx-owl-carousel-o';

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

  customOptions: OwlOptions = {
    loop: true,
    margin: 0,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    autoHeight: false,
    autoplay: true,
    dots: false,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    navSpeed: 30000,
    items: 1,
  };


  ngOnInit(): void {
    this.getTopProducts();
    this.getNewProducts();
  }

  ngAfterViewInit(): void {
    this.loadScripts();
  }

  removeRepeated(): void {
    this.topProducts.forEach((toprod) => {
      this.newProducts.forEach((newprod) => {
        if (toprod.id === newprod.id){
          this.newProducts.splice(this.newProducts.indexOf(newprod), 1);
        }
      });
    });
  }

  changeSelect(selected: number): void{
    this.selected = selected;
  }


  getTopProducts(): void {
    this.productService.getTopProducts().subscribe(products => {
      this.topProducts = products;
      this.removeRepeated();
    });
  }

  getNewProducts(): void {
    this.productService.getNewProducts().subscribe(products => {
      this.newProducts = products;
      this.removeRepeated();
    });
  }

  private loadScripts(): void {
    this.dynamicScriptLoader.loadAll().then(data => {
    }).catch(error => console.log(error));
  }

}
