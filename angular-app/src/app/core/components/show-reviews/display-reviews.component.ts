import {
  Component, EventEmitter,
  Input, OnChanges,
  OnInit, Output,
} from '@angular/core';
import {Product} from '../../models/product';
import {Review} from '../../models/review';
import {Client} from '../../models/client';

@Component({
  selector: 'app-display-reviews',
  templateUrl: './display-reviews.component.html',
  styleUrls: ['./display-reviews.component.css']
})
export class DisplayReviewsComponent implements OnInit {
  /*
   Child Component used in the Product Page to show it's Reviews
   */

  @Input() reviews: Review [] = []; // reviews for the specific product
  // tslint:disable-next-line:variable-name
  @Input() has_review: Review;
  p: number = Number(1);  // pagination variable
  constructor() {
  }
  // pass event from DisplayReviewsComponent's child to it's Father, ProductComponent
  @Output() deleteReviewEvent: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
  }

  // in Case a Review was deleted
  updateReviewList(data: Review): void{
    if (data){
      this.reviews.forEach( (item, index) => {
        if (item.id === data.id) { this.reviews.splice(index, 1); }
      }); // remove element from array
      this.deleteReviewEvent.emit(this.reviews);
    }
  }
}
