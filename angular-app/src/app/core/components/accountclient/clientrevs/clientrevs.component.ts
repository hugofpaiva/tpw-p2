import {Component, Input, OnInit} from '@angular/core';
import {Client} from '../../../models/client';
import {ReviewService} from '../../../services/review/review.service';
import {Review} from "../../../models/review";

@Component({
  selector: 'app-clientrevs',
  templateUrl: './clientrevs.component.html',
  styleUrls: ['./clientrevs.component.css']
})
export class ClientrevsComponent implements OnInit {
  @Input() client: Client;
  p: number = Number(1);
  reviews: Review[] = [];


  constructor(private reviewService: ReviewService) {
  }

  ngOnInit(): void {
    this.getRevs();
  }

  getRevs(): void {
    this.reviewService.getReviewsClient().subscribe(reviews => {this.reviews = reviews; console.log(this.reviews); });
  }

}
