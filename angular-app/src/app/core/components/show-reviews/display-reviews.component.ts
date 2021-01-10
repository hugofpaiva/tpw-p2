import {Component, Input, OnInit, OnChanges, EventEmitter, Output} from '@angular/core';
import {Product} from '../../models/product';
import {Review} from '../../models/review';

@Component({
  selector: 'app-display-reviews',
  templateUrl: './display-reviews.component.html',
  styleUrls: ['./display-reviews.component.css']
})
export class DisplayReviewsComponent implements OnInit {
  constructor() { }
  /*
   Child Component used in the Product Page to show it's Reviews
   */
   @Input() reviews: Review [] = [];
   p: number = Number(1);  // pagination variable


  ngOnInit(): void {
    console.log('child' + this.reviews);
    console.log(this.reviews);
  }
}
