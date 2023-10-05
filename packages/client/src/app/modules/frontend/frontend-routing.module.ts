import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from '~/guards/auth.guard';
import { FrontendComponent } from './frontend.component';

const routes: Routes = [
  {
    path: '',
    component: FrontendComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../homepage/homepage.module').then(m => m.HomepageModule),
      },
      {
        path: 'account',
        loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
        canActivateChild: [authGuard],
      },
      {
        path: '**',
        loadChildren: () => import('./page-not-found/page-not-found.module').then(m => m.PageNotFoundModule),
      },
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontendRoutingModule { }
