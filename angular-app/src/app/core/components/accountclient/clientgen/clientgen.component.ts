import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth/auth.service';
import {ClientService} from '../../../services/client/client.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {Client} from '../../../models/client';
import {UserService} from '../../../services/user/user.service';

@Component({
  selector: 'app-clientgen',
  templateUrl: './clientgen.component.html',
  styleUrls: ['./clientgen.component.css']
})
export class ClientgenComponent implements OnInit {
  updateError = false;
  updateForm: FormGroup;
  loading = false;
  submitted = false;
  @Input() client: Client;
  constructor(
    private clientService: ClientService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.updateForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      email : ['', [Validators.required, Validators.email]],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]]
    });
    this.clientService.getActualUser().subscribe(client => this.client = client);
  }




  ngOnInit(): void {

  }
  // convenience getter for easy access to form fields
  get f(): any { return this.updateForm.controls; }
  // Submit Method
  onSubmit(username: string, email: string, first_name: string, last_name: string): void {
    this.submitted = true;
    if (this.updateForm.invalid) {
      return;
    }
    this.loading = true;
    this.userService.updateUser(username, email, first_name, last_name, this.client.user.id)
      .subscribe(res => {
          this.router.navigate(['/']);
        },
        (err: HttpErrorResponse) => {
          this.updateError = true;
          this.loading = false;
        });
  }
}
