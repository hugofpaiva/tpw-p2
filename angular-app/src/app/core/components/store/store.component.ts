import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/product';
import {Developer} from '../../models/developer';
import {Category} from '../../models/category';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  products: Product[] = [];
  developers: Developer[] = [];
  categories: Category[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

}
