import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomsComponent } from './index/rooms.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RoomsRoutingModule,
    SharedModule,
  ],
  declarations: [RoomsComponent, AddEditComponent],
})
export class RoomsModule {}
