import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth/auth.service';
import {ClientService} from '../../../services/client/client.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {Client} from '../../../models/client';

@Component({
  selector: 'app-clientgen',
  templateUrl: './clientgen.component.html',
  styleUrls: ['./clientgen.component.css']
})
export class ClientgenComponent implements OnInit {
  updateClientData = {};
  updateError = false;
  updateForm: FormGroup;
  loading = false;
  submitted = false;
  client: Client;
  constructor(
    private authService: AuthService,
    private clientService: ClientService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.updateForm = this.formBuilder.group({
      username: ['', Validators.required, Validators.minLength(6)],
      email : ['', Validators.required, Validators.email],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required]
    });
    this.clientService.getActualUser().subscribe(client => this.client = client);
  }




  ngOnInit(): void {

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
    this.authService.updateClient(this.updateForm.value, this.client.user.id)
      .subscribe(res => {
          alert(res);
          this.router.navigate(['/']);
        },
        (err: HttpErrorResponse) => {
          this.updateError = true;
          this.loading = false;
        });
  }
}
