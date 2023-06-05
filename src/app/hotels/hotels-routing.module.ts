import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HotelsComponent } from './index/hotels.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import { AuthGuard } from '@app/helpers';
import { Role } from '@app/models';

const roomsModule = () =>
  import('./rooms/rooms.module').then((x) => x.RoomsModule);

const routes: Routes = [
  {
    path: '',
    component: HotelsComponent,
    children: [{ path: '', component: HotelsComponent }],
  },
  {
    path: 'add',
    component: AddEditComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.TravelAgency] },
  },
  {
    path: 'edit/:id',
    component: AddEditComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.TravelAgency] },
  },
  {
    path: ':hotelId/rooms',
    loadChildren: roomsModule,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HotelsRoutingModule {}
