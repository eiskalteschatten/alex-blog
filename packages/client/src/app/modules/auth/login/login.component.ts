import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UserLoginReply } from '@ab/shared';

import { AuthService } from '~/services/auth.service';
import { emailValidationRegex } from '~/helpers/email';

@Component({
  selector: 'blog-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  error?: string;
  loginForm: FormGroup = new FormGroup([]);

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(emailValidationRegex)
      ]),
      password: new FormControl('', Validators.required),
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;

      this.authService.login({
        email: this.email?.value,
        password: this.password?.value,
      }).subscribe({
        next: (reply: UserLoginReply) => {
          this.authService.setUserAuthData(reply);
          this.isLoading = false;
          this.router.navigate(['/']);
        },
        error: (error: HttpErrorResponse) => {
          this.isLoading = false;
          this.error = error.error.message;
        }
      });
    }
  }
}
