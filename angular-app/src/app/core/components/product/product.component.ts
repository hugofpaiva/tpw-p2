import {Component, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {ProductService} from '../../services/product/product.service';
import { Product } from '../../models/product';
import {HttpErrorResponse} from '@angular/common/http';
import {Review} from '../../models/review';
import {ReviewService} from '../../services/review/review.service';
import {ClientService} from '../../services/client/client.service';
import {PurchaseService} from '../../services/purchase/purchase.service';
import {Client} from '../../models/client';
import {SharedService} from '../../services/shared/shared.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  client: Client ;
  product: Product;
  reviews: Review [] = [];
  logoutInEventSubscription: Subscription;
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
    private location: Location,
    private activeroute: ActivatedRoute,
    private sharedService: SharedService) {
    this.logoutInEventSubscription = this.sharedService.getUserEvent().subscribe(() => {
      this.logoutHappened();
    });
    this.prodid = Number(this.activeroute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.getClient();

  }

  logoutHappened(): void {
      this.getClient();
  }

  getClient(): void  {
    this.clientService.getActualUser().subscribe(client => {
      this.client = client;
      this.getProduct();
      this.getReviews();
    }, err => {
      this.logoutInEventSubscription.unsubscribe();
      this.sharedService.error('You need to be logged in to access a product.', {keepAfterRouteChange: true, autoClose: true});
      this.location.back();
      console.log(err);
    });

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

  updateReviewList(data: any): void{
    this.reviews = data;
    //
    this.has_review = undefined; // probably there are better ways..
    console.log('Received from grandchild');
  }


}
