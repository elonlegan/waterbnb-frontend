import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { HotelsRoutingModule } from './hotels-routing.module';
import { HotelsComponent } from './index/hotels.component';
import { SharedModule } from '@app/shared/shared.module';
import { AddEditComponent } from './add-edit/add-edit.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HotelsRoutingModule,
    SharedModule,
  ],
  declarations: [HotelsComponent, AddEditComponent],
})
export class HotelsModule {}
