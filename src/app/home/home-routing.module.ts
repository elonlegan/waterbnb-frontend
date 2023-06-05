import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './index/home.component';
import { BookComponent } from './book/book.component';
import { AuthGuard } from '@app/helpers';
import { Role } from '@app/models';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [{ path: '', component: HomeComponent }],
  },
  {
    path: 'book/:roomId',
    component: BookComponent,
    // canActivate: [AuthGuard],
    // data: { roles: [Role.User] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
