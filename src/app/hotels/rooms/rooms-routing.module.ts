import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoomsComponent } from './index/rooms.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import { AuthGuard } from '@app/helpers';
import { Role } from '@app/models';

const routes: Routes = [
  {
    path: '',
    component: RoomsComponent,
    children: [{ path: '', component: RoomsComponent }],
  },
  {
    path: 'add',
    component: AddEditComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] },
  },
  {
    path: 'edit/:id',
    component: AddEditComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomsRoutingModule {}
