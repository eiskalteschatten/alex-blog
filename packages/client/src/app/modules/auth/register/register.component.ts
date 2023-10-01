import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UserLoginReply, passwordRegex } from '@ab/shared';

import { AuthService } from '~/services/auth.service';
import { emailValidationRegex } from '~/helpers/email';

@Component({
  selector: 'blog-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isLoading = false;
  error?: string;
  registrationForm: FormGroup = new FormGroup([]);

  ngOnInit() {
    this.registrationForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(emailValidationRegex)
      ]),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.minLength(8),
        Validators.required,
        Validators.pattern(passwordRegex)
      ]),
      confirmPassword: new FormControl('', [
        Validators.minLength(8),
        Validators.required,
        Validators.pattern(passwordRegex)
      ]),
    }, {
      validators: this.checkIfPasswordsMatch
    });
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  get email() { return this.registrationForm.get('email'); }
  get firstName() { return this.registrationForm.get('firstName'); }
  get lastName() { return this.registrationForm.get('lastName'); }
  get password() { return this.registrationForm.get('password'); }
  get confirmPassword() { return this.registrationForm.get('confirmPassword'); }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.isLoading = true;

      this.authService.register({
        email: this.email?.value,
        firstName: this.firstName?.value,
        lastName: this.lastName?.value,
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

  private checkIfPasswordsMatch(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    return password && confirmPassword && password.value === confirmPassword.value
      ? null
      : { passwordsDoNotMatch: true };
  }
}
