import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../models/product';
import {Client} from '../../models/client';
import {PurchaseService} from '../../services/purchase/purchase.service';
import {SharedService} from '../../services/shared/shared.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  /*
    Obtain Product and Client from the Parent Component (Product)
   */
  @Input() product: Product;
  @Input() client: Client;
  constructor(
    private  purchaseService: PurchaseService,
    protected sharedService: SharedService,
  ) { }

  ngOnInit(): void {
  }

  confirmPurchase(): void {
    if (this.product && this.client){
      let  purchaseObj : any = {};
      purchaseObj.client = this.client.id;
      purchaseObj.product = this.product.id;
      console.log(
        purchaseObj
      );
      this.purchaseService.createPurchase(purchaseObj).subscribe(
        data => {
          this.sharedService.success('Purchase Completed with Sucess!');
          this.sharedService.sendUserEvent();
          this.product.n_of_purchases = data.product.n_of_purchases;
        }, error => {
          if ( error.error.error_message !== undefined) {
            this.sharedService.error(String(error.error.error_message));
          }
        }
      );
    }
    }
}
