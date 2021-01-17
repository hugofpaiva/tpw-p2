import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ClientService} from '../../../services/client/client.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {Client} from '../../../models/client';
import {UserService} from '../../../services/user/user.service';
import {User} from '../../../models/user';
import {SharedService} from '../../../services/shared/shared.service';

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
  client: Client;
  @Input() user: User;
  constructor(
    private clientService: ClientService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private sharedService: SharedService
  ) {
    this.updateForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      email : ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
      first_name: ['', [Validators.required, Validators.maxLength(20)]],
      last_name: ['', [Validators.required, Validators.maxLength(20)]]
    });
  }


  getUser(): void {
    this.clientService.getActualUser().subscribe(client => {
      this.client = client;
      this.user = Object.assign({}, client.user);
    });
  }

  ngOnInit(): void {
    this.getUser();

  }
  // convenience getter for easy access to form fields
  get f(): any { return this.updateForm.controls; }
  // Submit Method
  onSubmit(): void {
    this.submitted = true;
    if (this.updateForm.invalid) {
      return;
    }
    this.loading = true;
    this.userService.updateUser(this.user, this.client.user.id)
      .subscribe(res => {
          this.sharedService.success('User updated successfully!');
          this.getUser();
          this.sharedService.sendUserEvent();
          this.loading = false;
        },
        (err: HttpErrorResponse) => {
          this.sharedService.error('There was a problem while trying to update the User.');
          this.updateError = true;
          this.loading = false;
        });
  }
}
