import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { adminAuthGuard, authGuard, reverseAuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'account',
    loadChildren: () => import('./modules/frontend/account/account.module').then(m => m.AccountModule),
    canActivateChild: [authGuard],
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
    canActivateChild: [adminAuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
    canActivateChild: [reverseAuthGuard],
  },
  {
    path: '**',
    loadChildren: () => import('./modules/frontend/frontend.module').then(m => m.FrontendModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
