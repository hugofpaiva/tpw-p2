import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../../services/product/product.service';
import {PurchaseService} from '../../../services/purchase/purchase.service';
import {Purchase} from '../../../models/purchase';

@Component({
  selector: 'app-adminpurchases',
  templateUrl: './adminpurchases.component.html',
  styleUrls: ['./adminpurchases.component.css']
})
export class AdminpurchasesComponent implements OnInit {

  purchases: Purchase[] = [];
  p: number = Number(1);

  constructor(private purchaseService: PurchaseService) { }

  ngOnInit(): void {
    this.getPurchases();
  }

  getPurchases(): void {
    this.purchaseService.getPurchases().subscribe(purchases => {this.purchases = purchases; console.log(this.purchases);});
  }

}
