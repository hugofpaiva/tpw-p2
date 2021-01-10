import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private subject = new Subject<any>();

  constructor() { }

  sendLogoutEvent(): void {
    this.subject.next();
  }
  getLogoutEvent(): Observable<any>{
    return this.subject.asObservable();
  }

}
