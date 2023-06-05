import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './helpers';
import { Account, Role } from './models';

const accountModule = () =>
  import('./account/account.module').then((x) => x.AccountModule);
const accountsModule = () =>
  import('./accounts/accounts.module').then((x) => x.AccountsModule);
const profileModule = () =>
  import('./profile/profile.module').then((x) => x.ProfileModule);
const hotelsModule = () =>
  import('./hotels/hotels.module').then((x) => x.HotelsModule);
const homeModule = () => import('./home/home.module').then((x) => x.HomeModule);

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    // pathMatch: 'full',
    loadChildren: homeModule,
    canActivate: [AuthGuard],
    data: { roles: [Role.User] },
  },
  { path: 'account', loadChildren: accountModule },
  { path: 'profile', loadChildren: profileModule, canActivate: [AuthGuard] },
  {
    path: 'hotels',
    loadChildren: hotelsModule,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.TravelAgency] },
  },
  {
    path: 'accounts',
    loadChildren: accountsModule,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] },
  },

  // otherwise redirect to home
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
