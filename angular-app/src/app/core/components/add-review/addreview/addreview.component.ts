import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Route} from '@angular/router';
import {ReviewService} from '../../../services/review/review.service';
import {Review} from '../../../models/review';
import {Location} from '@angular/common';

@Component({
  selector: 'app-addreview',
  templateUrl: './addreview.component.html',
  styleUrls: ['./addreview.component.css']
})
export class AddreviewComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  new_review: boolean;
  @Input() reviewForm: Review ;
  productid : number;
  constructor(
    private  location: Location,
    private activerouter: ActivatedRoute,
    private reviewService: ReviewService) {
    this.new_review = true;
  }

  ngOnInit(): void {
    this.getMyReview();
  }

  getMyReview(): void {
    // tslint:disable-next-line:variable-name
    this.productid = Number(this.activerouter.snapshot.paramMap.get('id'));
    if (this.productid  ){
      this.reviewService.getMyReviews(this.productid).subscribe( reviews => {
        if (reviews.length !== 0){
          this.reviewForm = reviews[0];
          this.new_review = false;
        }
        else {
          this.reviewForm = new Review();
        }
      });
    }
  }

  submitReview(): void {
    const serialized = JSON.stringify(this.reviewForm);
    const dict = JSON.parse(serialized);
    dict.product = this.productid;
    if (this.new_review) {
      this.reviewService.registerReview(dict).subscribe(data => {
        console.log(data);
        this.location.back();
      }, error => console.log(error));
    }
    else{
      dict.author = this.reviewForm.author.id;
      this.reviewService.updateReview(dict, this.reviewForm.id).subscribe( data  => {
        console.log(data);
        this.location.back();
      }, error => console.log(error));
    }

  }

}
