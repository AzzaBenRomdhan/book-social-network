import { Component } from '@angular/core';
import {RegisterRequest} from "../../services/models/register-request";
import {AuthenticationService} from "../../services/services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerRequest: RegisterRequest= {email:'', firstname:'', lastname:'', password:''};
  errorMsg: Array<string> = []
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  register () {
    this.errorMsg = [];
    this.authService.register({
      body: this.registerRequest
    }).subscribe({
      next: () => {
        this.router.navigate(['activate-account']);
      },
      error: (err) => {
        this.errorMsg = err.error.validationErrors;
      }
    })
  }
  login () {
    this.router.navigate(['login']);
  }
}
