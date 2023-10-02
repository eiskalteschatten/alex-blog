import { Component } from '@angular/core';

import { AuthService } from '~/services/auth.service';

@Component({
  selector: 'blog-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(
    private authService: AuthService
  ) {}

  logout(): void {
    this.authService.logout();
  }
}
