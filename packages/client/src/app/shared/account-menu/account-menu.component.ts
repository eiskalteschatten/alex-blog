import { Component } from '@angular/core';

import { AuthService } from '~/services/auth.service';

@Component({
  selector: 'blog-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.scss']
})
export class AccountMenuComponent {
  constructor(
    private authService: AuthService
  ) {}

  get userInitials(): string {
    if (!this.authService.user) {
      return '';
    }

    return `${this.authService.user.firstName.charAt(0)}${this.authService.user.lastName.charAt(0)}`.toUpperCase();
  }
}
