import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService, BookingService } from '@app/services';
import { Account } from '@app/models';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
  bookings: any[];

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.bookingService
      .getAll()
      .pipe(first())
      .subscribe((bookings) => (this.bookings = bookings));
  }
}
