import {Component, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../services/product/product.service';
import { Product } from '../../models/product';
import {HttpErrorResponse} from '@angular/common/http';
import {Review} from '../../models/review';
import {ReviewService} from '../../services/review/review.service';
import {ClientService} from '../../services/client/client.service';
import {PurchaseService} from '../../services/purchase/purchase.service';
import {Client} from '../../models/client';
import {Purchase} from '../../models/purchase';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnChanges {

  client: Client ;
  product: Product;
  reviews: Review [] = [];
  prodid = 0;
  totalPurch = 0;
  count = {};
  has_review: any;

  constructor(
    private productService: ProductService,
    private reviewService: ReviewService,
    private clientService: ClientService,
    private purchaseService: PurchaseService,
    private router: Router,
    private activeroute: ActivatedRoute) {
    this.prodid = Number(this.activeroute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if ( this.getClient()){
      this.getProduct();
      // data will be passed to the child component show-review
      this.getReviews();
      this.getTotalPurch();
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("CHANGES");
    console.log(changes);
  }
  getClient(): boolean  {
    this.clientService.getActualUser().subscribe(client => {
      this.client = client;
    }, err => {
        console.log(err);
        return false;
    });
    return true;
  }
  getProduct(): void {
    const id = this.activeroute.snapshot.paramMap.get('id');
    this.productService.getProduct(Number(id ))
      .subscribe(
        product => {
          this.product = product;
        }
        , (err: HttpErrorResponse) => {
          console.log(
            err
          );
              // this.router
        });
  }
  getReviews(): void {
    const id = this.activeroute.snapshot.paramMap.get('id');
    this.reviewService.getReviews(Number(id))
      .subscribe(
        reviews => {
          this.reviews = reviews;
          for (const rev  of reviews){
            if (rev.author.user.username === this.client.user.username){
              this.has_review = rev;
              break;
            }
          }
        }
        , (err: HttpErrorResponse) => {
          console.log(
            err
          );
        }
      );
  }

  getTotalPurch(): void {
    this.purchaseService.getPurchasesCount(this.prodid )
      .subscribe(
        dic => {
          this.count = dic;
          this.totalPurch = dic.count;
    });
  }

  updateReviewList(data: any): void{
    this.reviews = data;
    //
    this.has_review = undefined; // probably there are better ways..
    console.log('Received from grandchild');
  }


}
