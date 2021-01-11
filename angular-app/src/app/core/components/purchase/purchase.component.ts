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
    console.log('Product-->' + this.product);
  }

  confirmPurchase(): void {
    console.log('Proceeding to checkout ... ');
    if (this.product && this.client){
      let  purchaseObj : any = {};
      purchaseObj.client = this.client.id;
      purchaseObj.product = this.product.id;
      console.log(
        purchaseObj
      );
      this.purchaseService.createPurchase(purchaseObj).subscribe(
        data => {
          console.log(data);
          this.sharedService.success('Purchase Completed with Sucess!');
        }, error => {
          console.log(error.error.error_message);
          if ( error.error.error_message !== undefined) {
            this.sharedService.error(String(error.error.error_message));
          }
        }
      );
    }
    }
}
