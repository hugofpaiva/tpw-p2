import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../services/product/product.service';
import { Product } from '../../models/product';
import {HttpErrorResponse} from '@angular/common/http';
import {Review} from "../../models/review";
import {ReviewService} from "../../services/review/review.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: Product  ;
  reviews: Review [] = [];
  constructor(
    private productService: ProductService,
    private reviewService: ReviewService,
    private router: Router,
    private activeroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProduct();
    this.getReview(); // data will be passed to the child component show-review
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
  getReview(): void {
    const id = this.activeroute.snapshot.paramMap.get('id');
    this.reviewService.getReviews(Number(id))
      .subscribe(
        reviews => {
          this.reviews = reviews;
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
