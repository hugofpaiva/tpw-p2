import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Client} from '../../../models/client';
import {ClientService} from '../../../services/client/client.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {UserService} from '../../../services/user/user.service';

@Component({
  selector: 'app-clientpw',
  templateUrl: './clientpw.component.html',
  styleUrls: ['./clientpw.component.css']
})
export class ClientpwComponent implements OnInit {
  updateError = false;
  updatePwForm: FormGroup;
  loading = false;
  submitted = false;
  client: Client;
  constructor(
    private clientService: ClientService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.updatePwForm = this.formBuilder.group({
      old_password: ['', [Validators.required, Validators.maxLength(25)]],
      new_password1: ['', [Validators.required, Validators.maxLength(20)]],
      new_password2: ['', [Validators.required, Validators.maxLength(20)]]
    });
    this.clientService.getActualUser().subscribe(client => this.client = client);
  }




  ngOnInit(): void {

  }
  // convenience getter for easy access to form fields
  get f(): any { return this.updatePwForm.controls; }
  // Submit Method
  onSubmit(old_password: string, new_password1: string, new_password2: string): void {
    this.submitted = true;
    if (this.updatePwForm.invalid) {
      return;
    }
    this.loading = true;
    this.userService.updateUserPw(old_password, new_password1, new_password2, this.client.user.id)
      .subscribe(res => {
          this.router.navigate(['/']);
        },
        (err: HttpErrorResponse) => {
          this.updateError = true;
          this.loading = false;
        });
  }
}
