import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Product} from '../../models/product';
import {Developer} from '../../models/developer';
import {Category} from '../../models/category';
import {ProductService} from '../../services/product/product.service';
import {CategoryService} from '../../services/category/category.service';
import {DeveloperService} from '../../services/developer/developer.service';
import {DynamicScriptLoaderService} from '../../services/scripts/dynamic-script-loader-service.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit, AfterViewInit {
  products: Product[] = [];
  developers: Developer[] = [];
  categories: Category[] = [];
  categoryId?: number = undefined;
  developerId?: number = undefined;
  rating?: number = undefined;
  search = '';
  minPrice?: number = undefined;
  maxPrice?: number = undefined;
  order = 'cost';
  p: number = Number(1);
  math: Math = Math;


  constructor(private productService: ProductService, private categoryService: CategoryService,
              private developerService: DeveloperService, private dynamicScriptLoader: DynamicScriptLoaderService) {
  }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
    this.getDevelopers();
    this.loadScripts();
  }

  ngAfterViewInit(): void {
    this.loadScripts();
  }

  getProducts(): void {
    this.productService.getProductsParams(this.categoryId, this.developerId, this.rating, this.search,
      this.minPrice, this.maxPrice, this.order).subscribe(products => this.products = products);
  }

  selectCategory(cat: Category): void{
    if (cat.id === this.categoryId){
      this.categoryId = undefined;
    }else{
      this.categoryId = cat.id;
    }
    this.getProducts();
  }

  selectDeveloper(dev: Developer): void{
    if (dev.id === this.developerId){
      this.developerId = undefined;
    }else{
      this.developerId = dev.id;
    }
    this.getProducts();
  }

  selectRate(rate: number): void{
    if (rate === this.rating){
      this.rating = undefined;
    }else{
      this.rating = rate;
    }
    this.getProducts();
  }

  selectPrices(minPrice: number, maxPrice?: number): void{
    if (minPrice !==  null) {
      if (minPrice === this.minPrice) {
        this.minPrice = undefined;
      } else {
        this.minPrice = minPrice;
      }
    }

    if (maxPrice !==  null) {
      if (maxPrice === this.maxPrice) {
        this.maxPrice = undefined;
      } else {
        this.maxPrice = maxPrice;
      }
    }

    this.getProducts();
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
  }

  getDevelopers(): void {
    this.developerService.getDevelopers().subscribe(developers => this.developers = developers);
  }

  private loadScripts(): void {
    this.dynamicScriptLoader.loadAll().then(data => {
    }).catch(error => console.log(error));
  }

}
