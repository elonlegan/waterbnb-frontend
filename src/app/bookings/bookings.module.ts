import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { BookingsRoutingModule } from './bookings-routing.module';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, BookingsRoutingModule],
  declarations: [ListComponent, DetailComponent],
})
export class BookingsModule {}
