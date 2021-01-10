import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private subject = new Subject<any>();

  constructor() { }

  sendUserEvent(): void {
    this.subject.next();
  }
  getUserEvent(): Observable<any>{
    return this.subject.asObservable();
  }

}
