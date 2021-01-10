import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ReviewService} from '../../../services/review/review.service';
import {Review} from '../../../models/review';

@Component({
  selector: 'app-addreview',
  templateUrl: './addreview.component.html',
  styleUrls: ['./addreview.component.css']
})
export class AddreviewComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  new_review: boolean;
  reviewForm: Review ;
  constructor(
    private activerouter: ActivatedRoute,
    private reviewService: ReviewService) {
    this.new_review = true;
  }

  ngOnInit(): void {
    this.getMyReview();
  }

  getMyReview(): void {
    // tslint:disable-next-line:variable-name
    const product_id = this.activerouter.snapshot.paramMap.get('id');
    if (product_id  ){
      this.reviewService.getMyReviews(Number(product_id )).subscribe( reviews => {
        if (reviews.length !== 0){
          this.reviewForm = reviews[0];
          this.new_review=false;
        }
        else {
          this.reviewForm = new Review();
          this.reviewForm.product.id = Number(product_id);
        }
      });
    }
  }

  submitReview(): void {
    const serialized = JSON.stringify(this.reviewForm);
    const dict = JSON.parse(serialized);
    dict.product = this.reviewForm.product.id;
    if (this.new_review) {
      this.reviewService.registerReview();
    }
    else{
      dict.author = this.reviewForm.author.id;
    }

  }

}
