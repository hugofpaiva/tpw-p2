import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Review} from '../../models/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) {
  }
  getReview(id: number): Observable<Review>{
    const url = environment.baseURL + 'review?id=' + id;
    return this.http.get<Review>(url);
  }
  getReviews(): Observable<Review[]>{
    const url = environment.baseURL + 'reviews';
    return this.http.get<Review[]>(url);
  }

  getProductsP(page: number): Observable<Review[]>{
    const url = environment.baseURL + 'reviews?page=';
    return this.http.get<Review[]>(url);
  }
}
