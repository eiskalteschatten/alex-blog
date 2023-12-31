import { Component } from '@angular/core';

import { AuthService } from '~/services/auth.service';

@Component({
  selector: 'blog-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  constructor(
    private authService: AuthService
  ) {}

  logout(): void {
    this.authService.logout();
  }
}
