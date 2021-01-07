import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/product';

@Component({
  selector: 'app-initialpage',
  templateUrl: './initialpage.component.html',
  styleUrls: ['./initialpage.component.css']
})
export class InitialpageComponent implements OnInit {

  products: Product[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
