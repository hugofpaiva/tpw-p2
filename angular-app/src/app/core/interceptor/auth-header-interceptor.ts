import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth/auth.service';

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor{
    constructor(private injector: Injector) {
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const authService = this.injector.get(AuthService);
      if (authService.loggedIn()){
        console.log('entrei');
        let tokenizedReq = req.clone({
          setHeaders: {
            Authorization: `Token ${authService.getToken()}`
          }
        });
        return next.handle(tokenizedReq);
      }
      return next.handle(req);
    }
}
