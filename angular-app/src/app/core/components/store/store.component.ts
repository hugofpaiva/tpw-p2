import {AfterViewInit, Component, OnInit} from '@angular/core';
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
  search: string = String();
  minPrice?: number = undefined;
  maxPrice?: number = undefined;


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
      this.minPrice, this.maxPrice).subscribe(products => this.products = products);
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
