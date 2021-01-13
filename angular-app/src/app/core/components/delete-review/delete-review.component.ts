import {Component, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Review} from '../../models/review';
import {ReviewService} from '../../services/review/review.service';
import {SharedService} from '../../services/shared/shared.service';
import {EventEmitter} from '@angular/core';

@Component({
  selector: 'app-delete-review',
  templateUrl: './delete-review.component.html',
  styleUrls: ['./delete-review.component.css']
})
export class DeleteReviewComponent implements OnInit, OnChanges {
  /*
    Child Component of the Listing Review component.
   */
  @Input() clientReview: Review;
  constructor(
    private reviewService: ReviewService,
    private alertService: SharedService,
  ) { }
  // Tell parent component the Deletion of a Review
  @Output() deleteReviewEvent: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void
  {
    if (changes){
      this.clientReview = changes.clientReview.currentValue;
      console.log('Review to Delete');
      console.log(this.clientReview);
    }
  }
  confirmDelete(): void {
    if (this.clientReview){
      this.reviewService.deleteReview(this.clientReview.id).subscribe(
        data => {
          console.log(data);
          console.log(this.clientReview);
          this.alertService.success('Sucess Deleting Review',{ autoClose: true, fade: true});
          this.deleteReviewEvent.emit(this.clientReview);
        }, error => {
          console.log(error);
          this.alertService.error('Could not Delete Review. Some error Ocurred');
        }
      );
    }
  }

}
