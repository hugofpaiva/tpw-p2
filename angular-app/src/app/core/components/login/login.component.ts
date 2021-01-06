import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginError = false;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(userName: string, password: string): void{
    this.userService.userAuthentication(userName, password).subscribe((data: any) => {
      localStorage.setItem('userToken', data.token);
      this.router.navigate(['/']);
    }, (err: HttpErrorResponse) => {
      this.loginError = true;
    });
}

}
