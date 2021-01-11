import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../services/product/product.service';
import { Product } from '../../models/product';
import {HttpErrorResponse} from '@angular/common/http';
import {Review} from '../../models/review';
import {ReviewService} from '../../services/review/review.service';
import {ClientService} from '../../services/client/client.service';
import {Client} from '../../models/client';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  client: Client ;
  product: Product;
  reviews: Review [] = [];
  has_review: boolean;
  constructor(
    private productService: ProductService,
    private reviewService: ReviewService,
    private clientService: ClientService,
    private router: Router,
    private activeroute: ActivatedRoute) {
    this.has_review = false;
  }

  ngOnInit(): void {
    if ( this.getClient()){
      this.getProduct();
      // data will be passed to the child component show-review
      this.getReviews();
    }
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
          console.log(this.product.stars);
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
            console.log(rev.author.user.username + ' - ' + this.client.user.username );
            if (rev.author.user.username === this.client.user.username){
              this.has_review = true;
              break;
            }
          }
          console.log('-->' + this.reviews);
        }
        , (err: HttpErrorResponse) => {
          console.log(
            err
          );
        }
      );
  }




}
