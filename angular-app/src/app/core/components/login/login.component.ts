import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {SharedService} from '../../services/shared/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginError = false;
  constructor(private authService: AuthService, private router: Router, private sharedService: SharedService) { }

  ngOnInit(): void {
  }

  onSubmit(userName: string, password: string): void{
    this.authService.authenticateUser(userName, password).subscribe((data: any) => {
      localStorage.setItem('userToken', data.token);
      this.router.navigate(['/']);
      this.sharedService.sendLogoutEvent();
    }, (err: HttpErrorResponse) => {
      this.loginError = true;
    });
}

}
