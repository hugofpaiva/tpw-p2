import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {Client} from '../../models/client';
import {HttpErrorResponse} from '@angular/common/http';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerClientData = {};
  registerError = false;
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required, Validators.minLength(6), Validators.maxLength(20)],
      email : ['', Validators.required, Validators.email, Validators.maxLength(150)],
      first_name: ['', Validators.required, Validators.maxLength(20)],
      last_name: ['', Validators.required, Validators.maxLength(20)],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]]}
    );
  }




  ngOnInit(): void {
  }

  // convenience getter for easy access to form fields
  get f(): any { return this.registerForm.controls; }

  // Submit Method
  onSubmit(): void {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    this.authService.registerUser(this.registerForm.value)
      .subscribe(res => {
          alert(res);
          this.router.navigate(['/']);
        },
        (err: HttpErrorResponse) => {
          this.registerError = true;
          this.loading = false;
        });
  }
}
